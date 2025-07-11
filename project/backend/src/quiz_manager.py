class QuizManager:
    def __init__(self, database):
        self.db = database
    
    def get_onboarding_questions(self):
        """Get onboarding quiz questions"""
        questions = [
            {
                'id': 1,
                'question': 'What is your current experience with computers?',
                'options': [
                    'Complete beginner',
                    'Basic usage (email, browsing)',
                    'Intermediate (office software)',
                    'Advanced user'
                ],
                'category': 'technical'
            },
            {
                'id': 2,
                'question': 'Which digital skill interests you most?',
                'options': [
                    'Basic computer literacy',
                    'Digital marketing',
                    'Data entry & analysis',
                    'Online business skills'
                ],
                'category': 'interest'
            },
            {
                'id': 3,
                'question': 'How much time can you dedicate to learning daily?',
                'options': [
                    '10-15 minutes',
                    '30 minutes',
                    '1 hour',
                    'More than 1 hour'
                ],
                'category': 'availability'
            },
            {
                'id': 4,
                'question': 'What is your primary goal?',
                'options': [
                    'Find employment',
                    'Start a business',
                    'Improve current job',
                    'Personal development'
                ],
                'category': 'goal'
            }
        ]
        return questions
    
    def save_quiz_responses(self, user_id, responses):
        """Save user's quiz responses"""
        conn = self.db.get_connection()
        cursor = conn.cursor()
        
        try:
            # Clear existing responses
            cursor.execute('DELETE FROM quiz_responses WHERE user_id = ?', (user_id,))
            
            # Save new responses
            for question_id, response in responses.items():
                cursor.execute('''
                    INSERT INTO quiz_responses (user_id, question_id, response)
                    VALUES (?, ?, ?)
                ''', (user_id, question_id, response))
            
            # Update user profile with quiz results
            self._update_user_profile(cursor, user_id, responses)
            
            conn.commit()
            return {'success': True, 'message': 'Quiz responses saved'}
            
        except Exception as e:
            conn.rollback()
            return {'success': False, 'message': str(e)}
        finally:
            conn.close()
    
    def _update_user_profile(self, cursor, user_id, responses):
        """Update user profile based on quiz responses"""
        # Determine aptitude level
        technical_response = responses.get('1', '')
        if 'beginner' in technical_response.lower():
            aptitude_level = 'beginner'
        elif 'basic' in technical_response.lower():
            aptitude_level = 'basic'
        elif 'intermediate' in technical_response.lower():
            aptitude_level = 'intermediate'
        else:
            aptitude_level = 'advanced'
        
        # Get interests, time commitment, and goals
        interests = responses.get('2', '')
        time_commitment = responses.get('3', '')
        goals = responses.get('4', '')
        
        # Update user record
        cursor.execute('''
            UPDATE users 
            SET aptitude_level = ?, interests = ?, time_commitment = ?, goals = ?
            WHERE id = ?
        ''', (aptitude_level, interests, time_commitment, goals, user_id))
    
    def get_personalized_recommendations(self, user_id):
        """Get personalized course recommendations based on quiz responses"""
        conn = self.db.get_connection()
        cursor = conn.cursor()
        
        # Get user profile
        cursor.execute('''
            SELECT aptitude_level, interests, time_commitment, goals
            FROM users WHERE id = ?
        ''', (user_id,))
        
        user_profile = cursor.fetchone()
        if not user_profile:
            conn.close()
            return []
        
        aptitude_level, interests, time_commitment, goals = user_profile
        
        # Get recommended courses based on profile
        recommendations = []
        
        # Basic recommendations for beginners
        if aptitude_level in ['beginner', 'basic']:
            cursor.execute('''
                SELECT id, course_name, description, difficulty_level
                FROM courses 
                WHERE difficulty_level IN ('Beginner') AND is_active = 1
                ORDER BY course_name
            ''')
        else:
            cursor.execute('''
                SELECT id, course_name, description, difficulty_level
                FROM courses 
                WHERE is_active = 1
                ORDER BY 
                    CASE 
                        WHEN difficulty_level = 'Beginner' THEN 1
                        WHEN difficulty_level = 'Intermediate' THEN 2
                        WHEN difficulty_level = 'Advanced' THEN 3
                    END
            ''')
        
        for row in cursor.fetchall():
            recommendations.append({
                'course_id': row[0],
                'course_name': row[1],
                'description': row[2],
                'difficulty': row[3],
                'recommended_reason': self._get_recommendation_reason(
                    row[1], interests, goals, aptitude_level
                )
            })
        
        conn.close()
        return recommendations[:3]  # Return top 3 recommendations
    
    def _get_recommendation_reason(self, course_name, interests, goals, aptitude_level):
        """Generate recommendation reason based on user profile"""
        reasons = []
        
        if aptitude_level in ['beginner', 'basic']:
            reasons.append("Perfect for your current skill level")
        
        if interests and any(keyword in course_name.lower() for keyword in interests.lower().split()):
            reasons.append("Matches your interests")
        
        if goals:
            if 'employment' in goals.lower() and 'literacy' in course_name.lower():
                reasons.append("Essential for job applications")
            elif 'business' in goals.lower() and 'marketing' in course_name.lower():
                reasons.append("Great for starting a business")
        
        return "; ".join(reasons) if reasons else "Recommended for skill development"