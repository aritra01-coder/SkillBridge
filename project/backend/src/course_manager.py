from datetime import datetime
import sqlite3

class CourseManager:
    def __init__(self, database):
        self.db = database
    
    def get_all_courses(self):
        """Get all available courses"""
        conn = self.db.get_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, course_name, description, difficulty_level, estimated_duration
            FROM courses WHERE is_active = 1
            ORDER BY course_name
        ''')
        
        courses = []
        for row in cursor.fetchall():
            courses.append({
                'id': row[0],
                'name': row[1],
                'description': row[2],
                'difficulty': row[3],
                'duration': row[4]
            })
        
        conn.close()
        return courses
    
    def get_course_skillsnaps(self, course_id, user_id=None):
        """Get all skillsnaps for a course with user progress"""
        conn = self.db.get_connection()
        cursor = conn.cursor()
        
        query = '''
            SELECT s.id, s.title, s.description, s.duration_minutes, 
                   s.difficulty_level, s.category, s.order_index,
                   s.is_offline_available, up.completed_at
            FROM skillsnaps s
            LEFT JOIN user_progress up ON s.id = up.skillsnap_id AND up.user_id = ?
            WHERE s.course_id = ?
            ORDER BY s.order_index
        '''
        
        cursor.execute(query, (user_id, course_id))
        
        skillsnaps = []
        for row in cursor.fetchall():
            skillsnaps.append({
                'id': row[0],
                'title': row[1],
                'description': row[2],
                'duration': row[3],
                'difficulty': row[4],
                'category': row[5],
                'order_index': row[6],
                'is_offline_available': bool(row[7]),
                'is_completed': bool(row[8])
            })
        
        conn.close()
        return skillsnaps
    
    def get_user_enrollments(self, user_id):
        """Get all courses user is enrolled in"""
        conn = self.db.get_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT c.id, c.course_name, c.description, c.difficulty_level,
                   e.enrolled_at, e.progress_percentage, e.completed_at
            FROM enrollments e
            JOIN courses c ON e.course_id = c.id
            WHERE e.user_id = ?
            ORDER BY e.enrolled_at DESC
        ''', (user_id,))
        
        enrollments = []
        for row in cursor.fetchall():
            enrollments.append({
                'course_id': row[0],
                'course_name': row[1],
                'description': row[2],
                'difficulty': row[3],
                'enrolled_at': row[4],
                'progress': row[5],
                'completed_at': row[6]
            })
        
        conn.close()
        return enrollments
    
    def enroll_user(self, user_id, course_id):
        """Enroll user in a course"""
        conn = self.db.get_connection()
        cursor = conn.cursor()
        
        try:
            # Check if already enrolled
            cursor.execute('''
                SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?
            ''', (user_id, course_id))
            
            if cursor.fetchone():
                return {'success': False, 'message': 'Already enrolled in this course'}
            
            # Create enrollment
            cursor.execute('''
                INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)
            ''', (user_id, course_id))
            
            conn.commit()
            return {'success': True, 'message': 'Successfully enrolled'}
            
        except Exception as e:
            conn.rollback()
            return {'success': False, 'message': str(e)}
        finally:
            conn.close()
    
    def mark_skillsnap_complete(self, user_id, skillsnap_id, time_spent=None, score=None):
        """Mark a skillsnap as completed by user"""
        conn = self.db.get_connection()
        cursor = conn.cursor()
        
        try:
            # Check if already completed
            cursor.execute('''
                SELECT id FROM user_progress WHERE user_id = ? AND skillsnap_id = ?
            ''', (user_id, skillsnap_id))
            
            if cursor.fetchone():
                return {'success': False, 'message': 'SkillSnap already completed'}
            
            # Mark as completed
            cursor.execute('''
                INSERT INTO user_progress (user_id, skillsnap_id, completed_at, time_spent_minutes, score)
                VALUES (?, ?, CURRENT_TIMESTAMP, ?, ?)
            ''', (user_id, skillsnap_id, time_spent, score))
            
            # Update course progress
            self._update_course_progress(cursor, user_id, skillsnap_id)
            
            conn.commit()
            return {'success': True, 'message': 'SkillSnap marked as completed'}
            
        except Exception as e:
            conn.rollback()
            return {'success': False, 'message': str(e)}
        finally:
            conn.close()
    
    def _update_course_progress(self, cursor, user_id, skillsnap_id):
        """Update overall course progress percentage"""
        # Get course_id from skillsnap
        cursor.execute('SELECT course_id FROM skillsnaps WHERE id = ?', (skillsnap_id,))
        course_id = cursor.fetchone()[0]
        
        # Count total skillsnaps in course
        cursor.execute('SELECT COUNT(*) FROM skillsnaps WHERE course_id = ?', (course_id,))
        total_skillsnaps = cursor.fetchone()[0]
        
        # Count completed skillsnaps by user
        cursor.execute('''
            SELECT COUNT(*) FROM user_progress up
            JOIN skillsnaps s ON up.skillsnap_id = s.id
            WHERE up.user_id = ? AND s.course_id = ?
        ''', (user_id, course_id))
        completed_skillsnaps = cursor.fetchone()[0]
        
        # Calculate progress percentage
        progress = (completed_skillsnaps / total_skillsnaps) * 100 if total_skillsnaps > 0 else 0
        
        # Update enrollment progress
        cursor.execute('''
            UPDATE enrollments 
            SET progress_percentage = ?, 
                completed_at = CASE WHEN ? >= 100 THEN CURRENT_TIMESTAMP ELSE NULL END
            WHERE user_id = ? AND course_id = ?
        ''', (progress, progress, user_id, course_id))
    
    def get_user_dashboard(self, user_id):
        """Get user dashboard data"""
        conn = self.db.get_connection()
        cursor = conn.cursor()
        
        # Get enrollments with progress
        enrollments = self.get_user_enrollments(user_id)
        
        # Get recent activity
        cursor.execute('''
            SELECT s.title, s.category, up.completed_at
            FROM user_progress up
            JOIN skillsnaps s ON up.skillsnap_id = s.id
            WHERE up.user_id = ?
            ORDER BY up.completed_at DESC
            LIMIT 5
        ''', (user_id,))
        
        recent_activity = []
        for row in cursor.fetchall():
            recent_activity.append({
                'title': row[0],
                'category': row[1],
                'completed_at': row[2]
            })
        
        # Get certificates
        cursor.execute('''
            SELECT c.certificate_id, co.course_name, c.issued_at
            FROM certificates c
            JOIN courses co ON c.course_id = co.id
            WHERE c.user_id = ?
            ORDER BY c.issued_at DESC
        ''', (user_id,))
        
        certificates = []
        for row in cursor.fetchall():
            certificates.append({
                'certificate_id': row[0],
                'course_name': row[1],
                'issued_at': row[2]
            })
        
        conn.close()
        
        return {
            'enrollments': enrollments,
            'recent_activity': recent_activity,
            'certificates': certificates,
            'total_courses': len(enrollments),
            'completed_courses': len([e for e in enrollments if e['completed_at']]),
            'total_certificates': len(certificates)
        }