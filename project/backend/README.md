# SkillBridge Backend

A comprehensive Python backend system for the SkillBridge educational platform, designed to support rural learners with digital skills training.

## Features

### 🔐 Authentication & User Management
- User registration and login with secure password hashing
- JWT token-based authentication
- User profile management with aptitude tracking

### 📚 Course Management
- Course catalog with difficulty levels
- SkillSnap (microlearning) content delivery
- User enrollment and progress tracking
- Personalized learning paths

### 🧠 Intelligent Onboarding
- Aptitude-based assessment quiz
- Personalized course recommendations
- User preference tracking

### 🏆 Certificate System
- Automated certificate generation with QR codes
- Certificate verification system
- PDF certificate downloads

### 📊 Progress Tracking
- Individual lesson completion tracking
- Course progress percentages
- User dashboard with analytics

### 💾 Offline-First Design
- SQLite local database
- Minimal bandwidth requirements
- Sync-when-available architecture

## Technology Stack

- **Backend Framework**: Flask (Python)
- **Database**: SQLite (lightweight, offline-capable)
- **Authentication**: JWT tokens with bcrypt password hashing
- **Certificate Generation**: PIL (Python Imaging Library) + QRCode
- **API**: RESTful endpoints with JSON responses

## Installation & Setup

1. **Install Dependencies**:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Run the Server**:
   ```bash
   python run.py
   ```

3. **Server will start at**: `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

### Courses & Learning
- `GET /api/courses` - Get all available courses
- `GET /api/courses/{id}/skillsnaps` - Get course lessons
- `POST /api/enrollments` - Enroll in course
- `GET /api/enrollments` - Get user enrollments
- `POST /api/skillsnaps/{id}/complete` - Mark lesson complete

### Quiz & Recommendations
- `GET /api/quiz/questions` - Get onboarding quiz
- `POST /api/quiz/responses` - Save quiz responses
- `GET /api/recommendations` - Get personalized recommendations

### Certificates
- `POST /api/certificates/generate` - Generate certificate
- `GET /api/certificates` - Get user certificates
- `GET /api/certificates/verify/{id}` - Verify certificate
- `GET /api/certificates/download/{id}` - Download certificate

### Dashboard
- `GET /api/dashboard` - Get user dashboard data

## Database Schema

### Users Table
- User credentials and profile information
- Aptitude level and learning preferences
- Progress tracking fields

### Courses Table
- Course catalog with metadata
- Difficulty levels and duration estimates

### SkillSnaps Table
- Individual lesson content
- Duration, category, and ordering information

### Progress Tracking
- User completion records
- Time spent and scoring data

### Certificates
- Certificate records with verification data
- QR code and file paths

## Key Features for Rural Learners

### 🌐 Offline-First Architecture
- SQLite database requires no internet connection
- Content can be pre-loaded and accessed offline
- Sync progress when connectivity is available

### 📱 Low-End Device Support
- Minimal system requirements
- Efficient memory usage
- Optimized for basic smartphones and older computers

### 🎯 Personalized Learning
- Aptitude-based course recommendations
- Customized learning paths
- Progress-aware content delivery

### ⚡ Microlearning Focus
- 10-15 minute lesson chunks
- Daily learning goals
- Bite-sized skill development

### 🏅 Credible Certification
- QR-coded certificates for instant verification
- Simple validation process for employers
- No complex blockchain dependencies

## Sample Data

The system comes pre-loaded with:
- 6 sample courses (Digital Literacy, Computer Fundamentals, etc.)
- 10+ SkillSnap lessons across different categories
- Difficulty progression from Beginner to Advanced

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- SQL injection prevention

## Scalability Considerations

- SQLite for local/small deployments
- Easy migration path to PostgreSQL/MySQL for larger scale
- Stateless API design for horizontal scaling
- Modular architecture for feature expansion

## Development Notes

This backend is specifically designed for the SkillBridge educational platform, focusing on:
- Simplicity and reliability over complexity
- Offline capability for rural connectivity challenges
- Student-friendly technology stack
- Production-ready code with proper error handling

The system prioritizes practical functionality that works in real-world rural environments while maintaining professional development standards.