import bcrypt
import jwt
from datetime import datetime, timedelta
from functools import wraps
from flask import request, jsonify, current_app
import sqlite3

class AuthManager:
    def __init__(self, database):
        self.db = database
        self.secret_key = "skillbridge_secret_key_2024"  # In production, use environment variable
    
    def hash_password(self, password):
        """Hash password using bcrypt"""
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    def verify_password(self, password, hashed):
        """Verify password against hash"""
        return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))
    
    def generate_token(self, user_id):
        """Generate JWT token for user"""
        payload = {
            'user_id': user_id,
            'exp': datetime.utcnow() + timedelta(days=7)  # Token expires in 7 days
        }
        return jwt.encode(payload, self.secret_key, algorithm='HS256')
    
    def verify_token(self, token):
        """Verify JWT token and return user_id"""
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=['HS256'])
            return payload['user_id']
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
    
    def register_user(self, user_data):
        """Register new user"""
        conn = self.db.get_connection()
        cursor = conn.cursor()
        
        try:
            # Check if user_id already exists
            cursor.execute("SELECT id FROM users WHERE user_id = ?", (user_data['user_id'],))
            if cursor.fetchone():
                return {'success': False, 'message': 'User ID already exists'}
            
            # Hash password
            password_hash = self.hash_password(user_data['password'])
            
            # Insert user
            cursor.execute('''
                INSERT INTO users (user_id, password_hash, name, email, location, language_preference)
                VALUES (?, ?, ?, ?, ?, ?)
            ''', (
                user_data['user_id'],
                password_hash,
                user_data['name'],
                user_data.get('email', ''),
                user_data.get('location', ''),
                user_data.get('language_preference', 'English')
            ))
            
            user_db_id = cursor.lastrowid
            conn.commit()
            
            # Generate token
            token = self.generate_token(user_db_id)
            
            return {
                'success': True,
                'token': token,
                'user': {
                    'id': user_db_id,
                    'user_id': user_data['user_id'],
                    'name': user_data['name']
                }
            }
            
        except Exception as e:
            conn.rollback()
            return {'success': False, 'message': str(e)}
        finally:
            conn.close()
    
    def login_user(self, user_id, password, course_name=None):
        """Authenticate user login"""
        conn = self.db.get_connection()
        cursor = conn.cursor()
        
        try:
            # Get user data
            cursor.execute('''
                SELECT id, user_id, password_hash, name, email, location
                FROM users WHERE user_id = ?
            ''', (user_id,))
            
            user = cursor.fetchone()
            if not user:
                return {'success': False, 'message': 'User not found'}
            
            # Verify password
            if not self.verify_password(password, user[2]):
                return {'success': False, 'message': 'Invalid password'}
            
            # Update last login
            cursor.execute('''
                UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?
            ''', (user[0],))
            
            # If course specified, check/create enrollment
            if course_name:
                cursor.execute("SELECT id FROM courses WHERE course_name = ?", (course_name,))
                course = cursor.fetchone()
                if course:
                    # Check if already enrolled
                    cursor.execute('''
                        SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?
                    ''', (user[0], course[0]))
                    if not cursor.fetchone():
                        # Create enrollment
                        cursor.execute('''
                            INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)
                        ''', (user[0], course[0]))
            
            conn.commit()
            
            # Generate token
            token = self.generate_token(user[0])
            
            return {
                'success': True,
                'token': token,
                'user': {
                    'id': user[0],
                    'user_id': user[1],
                    'name': user[3],
                    'email': user[4],
                    'location': user[5]
                }
            }
            
        except Exception as e:
            return {'success': False, 'message': str(e)}
        finally:
            conn.close()
    
    def get_user_by_token(self, token):
        """Get user data by token"""
        user_id = self.verify_token(token)
        if not user_id:
            return None
        
        conn = self.db.get_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, user_id, name, email, location, language_preference
            FROM users WHERE id = ?
        ''', (user_id,))
        
        user = cursor.fetchone()
        conn.close()
        
        if user:
            return {
                'id': user[0],
                'user_id': user[1],
                'name': user[2],
                'email': user[3],
                'location': user[4],
                'language_preference': user[5]
            }
        return None

def require_auth(f):
    """Decorator to require authentication"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'No token provided'}), 401
        
        if token.startswith('Bearer '):
            token = token[7:]
        
        auth_manager = current_app.auth_manager
        user = auth_manager.get_user_by_token(token)
        if not user:
            return jsonify({'error': 'Invalid token'}), 401
        
        request.current_user = user
        return f(*args, **kwargs)
    
    return decorated_function