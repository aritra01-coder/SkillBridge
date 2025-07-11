import sqlite3
import os
from datetime import datetime
import bcrypt

class Database:
    def __init__(self, db_path="data/skillbridge.db"):
        self.db_path = db_path
        self.init_database()
    
    def get_connection(self):
        """Get database connection"""
        return sqlite3.connect(self.db_path)
    
    def init_database(self):
        """Initialize database with all required tables"""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        # Users table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                name TEXT NOT NULL,
                email TEXT,
                location TEXT,
                language_preference TEXT DEFAULT 'English',
                aptitude_level TEXT,
                interests TEXT,
                time_commitment TEXT,
                goals TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_login TIMESTAMP
            )
        ''')
        
        # Courses table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS courses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                course_name TEXT UNIQUE NOT NULL,
                description TEXT,
                difficulty_level TEXT,
                estimated_duration INTEGER,
                is_active BOOLEAN DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # SkillSnaps (lessons) table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS skillsnaps (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                course_id INTEGER,
                title TEXT NOT NULL,
                description TEXT,
                content TEXT,
                duration_minutes INTEGER,
                difficulty_level TEXT,
                category TEXT,
                order_index INTEGER,
                is_offline_available BOOLEAN DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (course_id) REFERENCES courses (id)
            )
        ''')
        
        # User enrollments
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS enrollments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                course_id INTEGER,
                enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                completed_at TIMESTAMP,
                progress_percentage REAL DEFAULT 0,
                FOREIGN KEY (user_id) REFERENCES users (id),
                FOREIGN KEY (course_id) REFERENCES courses (id)
            )
        ''')
        
        # User progress tracking
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS user_progress (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                skillsnap_id INTEGER,
                completed_at TIMESTAMP,
                time_spent_minutes INTEGER,
                score REAL,
                FOREIGN KEY (user_id) REFERENCES users (id),
                FOREIGN KEY (skillsnap_id) REFERENCES skillsnaps (id)
            )
        ''')
        
        # Certificates table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS certificates (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                course_id INTEGER,
                certificate_id TEXT UNIQUE NOT NULL,
                issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                qr_code_path TEXT,
                verification_url TEXT,
                FOREIGN KEY (user_id) REFERENCES users (id),
                FOREIGN KEY (course_id) REFERENCES courses (id)
            )
        ''')
        
        # Quiz responses for onboarding
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS quiz_responses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                question_id INTEGER,
                response TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id)
            )
        ''')
        
        conn.commit()
        conn.close()
        
        # Insert sample data
        self.insert_sample_data()
    
    def insert_sample_data(self):
        """Insert sample courses and skillsnaps"""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        # Check if sample data already exists
        cursor.execute("SELECT COUNT(*) FROM courses")
        if cursor.fetchone()[0] > 0:
            conn.close()
            return
        
        # Sample courses
        courses = [
            ('Digital Literacy Basics', 'Fundamental computer and internet skills', 'Beginner', 120),
            ('Computer Fundamentals', 'Basic computer operations and file management', 'Beginner', 90),
            ('Internet & Email Skills', 'Web browsing and email communication', 'Beginner', 60),
            ('Digital Marketing Essentials', 'Social media and online marketing basics', 'Intermediate', 150),
            ('Data Entry & Analysis', 'Spreadsheet skills and data management', 'Intermediate', 100),
            ('Online Business Skills', 'E-commerce and digital entrepreneurship', 'Advanced', 180)
        ]
        
        for course in courses:
            cursor.execute('''
                INSERT INTO courses (course_name, description, difficulty_level, estimated_duration)
                VALUES (?, ?, ?, ?)
            ''', course)
        
        # Sample skillsnaps for Digital Literacy Basics
        skillsnaps = [
            (1, 'Computer Basics: Getting Started', 'Learn fundamental computer operations and navigation', 'Introduction to computers, mouse, and keyboard basics', 12, 'Beginner', 'Digital Literacy', 1),
            (1, 'Understanding Files and Folders', 'Master file organization and management', 'Creating, organizing, and managing files and folders', 15, 'Beginner', 'Digital Literacy', 2),
            (1, 'Internet Basics', 'Introduction to web browsing and online safety', 'Using web browsers, search engines, and staying safe online', 18, 'Beginner', 'Digital Literacy', 3),
            (1, 'Email Communication Skills', 'Master professional email writing and management', 'Creating, sending, and organizing emails professionally', 15, 'Beginner', 'Communication', 4),
            (2, 'Operating System Navigation', 'Navigate Windows/Android interface efficiently', 'Understanding desktop, taskbar, and system settings', 20, 'Beginner', 'Computer Skills', 1),
            (3, 'Web Browser Mastery', 'Advanced browsing techniques and shortcuts', 'Bookmarks, tabs, downloads, and browser settings', 14, 'Beginner', 'Internet Skills', 1),
            (4, 'Social Media for Business', 'Create engaging content to promote your local business', 'Facebook, Instagram, and WhatsApp business strategies', 25, 'Intermediate', 'Digital Marketing', 1),
            (4, 'Digital Payment Systems', 'Learn to use UPI, mobile banking, and digital wallets safely', 'UPI, Paytm, Google Pay, and online banking security', 20, 'Intermediate', 'Financial Literacy', 2),
            (5, 'Spreadsheet Fundamentals', 'Basic Excel/Google Sheets operations', 'Creating tables, basic formulas, and data formatting', 22, 'Intermediate', 'Data Skills', 1),
            (6, 'Online Job Applications', 'Navigate job portals and create compelling applications', 'Naukri.com, LinkedIn, and resume building online', 18, 'Advanced', 'Career Skills', 1)
        ]
        
        for skillsnap in skillsnaps:
            cursor.execute('''
                INSERT INTO skillsnaps (course_id, title, description, content, duration_minutes, difficulty_level, category, order_index)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ''', skillsnap)
        
        conn.commit()
        conn.close()