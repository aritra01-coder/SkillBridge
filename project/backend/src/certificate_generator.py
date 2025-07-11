import qrcode
from PIL import Image, ImageDraw, ImageFont
import os
from datetime import datetime
import uuid

class CertificateGenerator:
    def __init__(self, database):
        self.db = database
        self.certificates_dir = "certificates"
        self.static_dir = "static"
        
        # Create directories if they don't exist
        os.makedirs(self.certificates_dir, exist_ok=True)
        os.makedirs(self.static_dir, exist_ok=True)
    
    def generate_certificate(self, user_id, course_id):
        """Generate certificate for user completing a course"""
        conn = self.db.get_connection()
        cursor = conn.cursor()
        
        try:
            # Check if certificate already exists
            cursor.execute('''
                SELECT certificate_id FROM certificates 
                WHERE user_id = ? AND course_id = ?
            ''', (user_id, course_id))
            
            existing = cursor.fetchone()
            if existing:
                return {'success': False, 'message': 'Certificate already exists', 'certificate_id': existing[0]}
            
            # Get user and course data
            cursor.execute('''
                SELECT u.name, c.course_name
                FROM users u, courses c
                WHERE u.id = ? AND c.id = ?
            ''', (user_id, course_id))
            
            user_course = cursor.fetchone()
            if not user_course:
                return {'success': False, 'message': 'User or course not found'}
            
            user_name, course_name = user_course
            
            # Generate unique certificate ID
            certificate_id = f"SB-{datetime.now().year}-{str(uuid.uuid4())[:8].upper()}"
            
            # Create verification URL
            verification_url = f"https://skillbridge.edu/verify/{certificate_id}"
            
            # Generate QR code
            qr_code_path = self._generate_qr_code(verification_url, certificate_id)
            
            # Generate certificate image
            cert_image_path = self._generate_certificate_image(
                user_name, course_name, certificate_id, qr_code_path
            )
            
            # Save certificate record
            cursor.execute('''
                INSERT INTO certificates (user_id, course_id, certificate_id, qr_code_path, verification_url)
                VALUES (?, ?, ?, ?, ?)
            ''', (user_id, course_id, certificate_id, qr_code_path, verification_url))
            
            conn.commit()
            
            return {
                'success': True,
                'certificate_id': certificate_id,
                'verification_url': verification_url,
                'qr_code_path': qr_code_path,
                'certificate_image': cert_image_path
            }
            
        except Exception as e:
            conn.rollback()
            return {'success': False, 'message': str(e)}
        finally:
            conn.close()
    
    def _generate_qr_code(self, verification_url, certificate_id):
        """Generate QR code for certificate verification"""
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(verification_url)
        qr.make(fit=True)
        
        qr_image = qr.make_image(fill_color="black", back_color="white")
        qr_path = f"{self.static_dir}/qr_{certificate_id}.png"
        qr_image.save(qr_path)
        
        return qr_path
    
    def _generate_certificate_image(self, user_name, course_name, certificate_id, qr_code_path):
        """Generate certificate image"""
        # Create certificate image (800x600)
        width, height = 800, 600
        image = Image.new('RGB', (width, height), 'white')
        draw = ImageDraw.Draw(image)
        
        # Try to use a nice font, fallback to default
        try:
            title_font = ImageFont.truetype("arial.ttf", 36)
            name_font = ImageFont.truetype("arial.ttf", 28)
            text_font = ImageFont.truetype("arial.ttf", 18)
            small_font = ImageFont.truetype("arial.ttf", 14)
        except:
            title_font = ImageFont.load_default()
            name_font = ImageFont.load_default()
            text_font = ImageFont.load_default()
            small_font = ImageFont.load_default()
        
        # Draw border
        border_color = "#2563eb"  # Blue
        draw.rectangle([20, 20, width-20, height-20], outline=border_color, width=3)
        draw.rectangle([30, 30, width-30, height-30], outline=border_color, width=1)
        
        # Title
        title = "Certificate of Completion"
        title_bbox = draw.textbbox((0, 0), title, font=title_font)
        title_width = title_bbox[2] - title_bbox[0]
        draw.text(((width - title_width) // 2, 80), title, fill="#1f2937", font=title_font)
        
        # "This certifies that"
        certifies_text = "This certifies that"
        certifies_bbox = draw.textbbox((0, 0), certifies_text, font=text_font)
        certifies_width = certifies_bbox[2] - certifies_bbox[0]
        draw.text(((width - certifies_width) // 2, 150), certifies_text, fill="#6b7280", font=text_font)
        
        # User name
        name_bbox = draw.textbbox((0, 0), user_name, font=name_font)
        name_width = name_bbox[2] - name_bbox[0]
        draw.text(((width - name_width) // 2, 190), user_name, fill="#2563eb", font=name_font)
        
        # "has successfully completed"
        completed_text = "has successfully completed"
        completed_bbox = draw.textbbox((0, 0), completed_text, font=text_font)
        completed_width = completed_bbox[2] - completed_bbox[0]
        draw.text(((width - completed_width) // 2, 240), completed_text, fill="#6b7280", font=text_font)
        
        # Course name
        course_bbox = draw.textbbox((0, 0), course_name, font=name_font)
        course_width = course_bbox[2] - course_bbox[0]
        draw.text(((width - course_width) // 2, 280), course_name, fill="#1f2937", font=name_font)
        
        # Date
        date_text = f"Completion Date: {datetime.now().strftime('%B %d, %Y')}"
        date_bbox = draw.textbbox((0, 0), date_text, font=text_font)
        date_width = date_bbox[2] - date_bbox[0]
        draw.text(((width - date_width) // 2, 350), date_text, fill="#6b7280", font=text_font)
        
        # Certificate ID
        id_text = f"Certificate ID: {certificate_id}"
        draw.text((50, height - 80), id_text, fill="#6b7280", font=small_font)
        
        # SkillBridge logo/text
        logo_text = "SkillBridge"
        draw.text((50, height - 60), logo_text, fill="#2563eb", font=text_font)
        
        # Add QR code
        try:
            qr_image = Image.open(qr_code_path)
            qr_image = qr_image.resize((80, 80))
            image.paste(qr_image, (width - 130, height - 130))
            
            # QR code label
            draw.text((width - 130, height - 45), "Verify Online", fill="#6b7280", font=small_font)
        except:
            pass  # Skip QR code if file not found
        
        # Save certificate image
        cert_path = f"{self.certificates_dir}/cert_{certificate_id}.png"
        image.save(cert_path)
        
        return cert_path
    
    def verify_certificate(self, certificate_id):
        """Verify certificate by ID"""
        conn = self.db.get_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT c.certificate_id, c.issued_at, u.name, co.course_name, c.verification_url
            FROM certificates c
            JOIN users u ON c.user_id = u.id
            JOIN courses co ON c.course_id = co.id
            WHERE c.certificate_id = ?
        ''', (certificate_id,))
        
        result = cursor.fetchone()
        conn.close()
        
        if result:
            return {
                'valid': True,
                'certificate_id': result[0],
                'issued_at': result[1],
                'student_name': result[2],
                'course_name': result[3],
                'verification_url': result[4]
            }
        else:
            return {'valid': False, 'message': 'Certificate not found'}
    
    def get_user_certificates(self, user_id):
        """Get all certificates for a user"""
        conn = self.db.get_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT c.certificate_id, co.course_name, c.issued_at, c.verification_url
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
                'issued_at': row[2],
                'verification_url': row[3]
            })
        
        conn.close()
        return certificates