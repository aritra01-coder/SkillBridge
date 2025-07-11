#!/usr/bin/env python3
"""
SkillBridge Backend Server
Run this file to start the backend API server
"""

import os
import sys

# Add the src directory to Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

from app import app

if __name__ == '__main__':
    print("🚀 Starting SkillBridge Backend Server...")
    print("📚 API Documentation:")
    print("   - Health Check: GET /health")
    print("   - Register: POST /api/auth/register")
    print("   - Login: POST /api/auth/login")
    print("   - Get Courses: GET /api/courses")
    print("   - Get Dashboard: GET /api/dashboard")
    print("   - Quiz Questions: GET /api/quiz/questions")
    print("   - Generate Certificate: POST /api/certificates/generate")
    print("   - Verify Certificate: GET /api/certificates/verify/<id>")
    print("")
    print("🌐 Server running at: http://localhost:5000")
    print("📱 Frontend should connect to: http://localhost:5000/api")
    print("")
    
    # Create necessary directories
    os.makedirs('data', exist_ok=True)
    os.makedirs('certificates', exist_ok=True)
    os.makedirs('static', exist_ok=True)
    
    # Run the Flask application
    app.run(debug=True, host='0.0.0.0', port=5000)