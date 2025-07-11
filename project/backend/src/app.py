from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
from datetime import datetime

# Import our modules
from database import Database
from auth import AuthManager, require_auth
from course_manager import CourseManager
from certificate_generator import CertificateGenerator
from quiz_manager import QuizManager

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Initialize components
db = Database()
auth_manager = AuthManager(db)
course_manager = CourseManager(db)
certificate_generator = CertificateGenerator(db)
quiz_manager = QuizManager(db)

# Make auth_manager available to decorators
app.auth_manager = auth_manager

# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

# Authentication endpoints
@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    
    required_fields = ['user_id', 'password', 'name']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    result = auth_manager.register_user(data)
    
    if result['success']:
        return jsonify(result), 201
    else:
        return jsonify(result), 400

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data.get('user_id') or not data.get('password'):
        return jsonify({'error': 'User ID and password required'}), 400
    
    result = auth_manager.login_user(
        data['user_id'], 
        data['password'], 
        data.get('course')
    )
    
    if result['success']:
        return jsonify(result), 200
    else:
        return jsonify(result), 401

@app.route('/api/auth/me', methods=['GET'])
@require_auth
def get_current_user():
    return jsonify({'user': request.current_user})

# Course endpoints
@app.route('/api/courses', methods=['GET'])
def get_courses():
    courses = course_manager.get_all_courses()
    return jsonify({'courses': courses})

@app.route('/api/courses/<int:course_id>/skillsnaps', methods=['GET'])
@require_auth
def get_course_skillsnaps(course_id):
    skillsnaps = course_manager.get_course_skillsnaps(course_id, request.current_user['id'])
    return jsonify({'skillsnaps': skillsnaps})

@app.route('/api/enrollments', methods=['GET'])
@require_auth
def get_user_enrollments():
    enrollments = course_manager.get_user_enrollments(request.current_user['id'])
    return jsonify({'enrollments': enrollments})

@app.route('/api/enrollments', methods=['POST'])
@require_auth
def enroll_in_course():
    data = request.get_json()
    course_id = data.get('course_id')
    
    if not course_id:
        return jsonify({'error': 'Course ID required'}), 400
    
    result = course_manager.enroll_user(request.current_user['id'], course_id)
    
    if result['success']:
        return jsonify(result), 201
    else:
        return jsonify(result), 400

@app.route('/api/skillsnaps/<int:skillsnap_id>/complete', methods=['POST'])
@require_auth
def complete_skillsnap(skillsnap_id):
    data = request.get_json() or {}
    
    result = course_manager.mark_skillsnap_complete(
        request.current_user['id'],
        skillsnap_id,
        data.get('time_spent'),
        data.get('score')
    )
    
    if result['success']:
        return jsonify(result), 200
    else:
        return jsonify(result), 400

@app.route('/api/dashboard', methods=['GET'])
@require_auth
def get_dashboard():
    dashboard_data = course_manager.get_user_dashboard(request.current_user['id'])
    return jsonify(dashboard_data)

# Quiz endpoints
@app.route('/api/quiz/questions', methods=['GET'])
def get_quiz_questions():
    questions = quiz_manager.get_onboarding_questions()
    return jsonify({'questions': questions})

@app.route('/api/quiz/responses', methods=['POST'])
@require_auth
def save_quiz_responses():
    data = request.get_json()
    responses = data.get('responses', {})
    
    result = quiz_manager.save_quiz_responses(request.current_user['id'], responses)
    
    if result['success']:
        # Get personalized recommendations
        recommendations = quiz_manager.get_personalized_recommendations(request.current_user['id'])
        result['recommendations'] = recommendations
        return jsonify(result), 200
    else:
        return jsonify(result), 400

@app.route('/api/recommendations', methods=['GET'])
@require_auth
def get_recommendations():
    recommendations = quiz_manager.get_personalized_recommendations(request.current_user['id'])
    return jsonify({'recommendations': recommendations})

# Certificate endpoints
@app.route('/api/certificates/generate', methods=['POST'])
@require_auth
def generate_certificate():
    data = request.get_json()
    course_id = data.get('course_id')
    
    if not course_id:
        return jsonify({'error': 'Course ID required'}), 400
    
    result = certificate_generator.generate_certificate(request.current_user['id'], course_id)
    
    if result['success']:
        return jsonify(result), 201
    else:
        return jsonify(result), 400

@app.route('/api/certificates', methods=['GET'])
@require_auth
def get_user_certificates():
    certificates = certificate_generator.get_user_certificates(request.current_user['id'])
    return jsonify({'certificates': certificates})

@app.route('/api/certificates/verify/<certificate_id>', methods=['GET'])
def verify_certificate(certificate_id):
    result = certificate_generator.verify_certificate(certificate_id)
    return jsonify(result)

@app.route('/api/certificates/download/<certificate_id>', methods=['GET'])
def download_certificate(certificate_id):
    # Verify certificate belongs to current user (if authenticated)
    result = certificate_generator.verify_certificate(certificate_id)
    
    if not result['valid']:
        return jsonify({'error': 'Certificate not found'}), 404
    
    # Find certificate file
    cert_path = f"certificates/cert_{certificate_id}.png"
    
    if os.path.exists(cert_path):
        return send_file(cert_path, as_attachment=True, download_name=f"certificate_{certificate_id}.png")
    else:
        return jsonify({'error': 'Certificate file not found'}), 404

# Static file serving for QR codes and certificates
@app.route('/static/<filename>')
def serve_static(filename):
    static_path = f"static/{filename}"
    if os.path.exists(static_path):
        return send_file(static_path)
    else:
        return jsonify({'error': 'File not found'}), 404

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    # Create data directory if it doesn't exist
    os.makedirs('data', exist_ok=True)
    
    # Run the application
    app.run(debug=True, host='0.0.0.0', port=5000)