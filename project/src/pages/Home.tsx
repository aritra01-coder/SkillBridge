import React, { useState } from 'react';
import { ArrowRight, Target, Zap, Wifi, ChevronRight, Play, Award } from 'lucide-react';
import OnboardingQuiz from '../components/OnboardingQuiz';
import SkillSnapCard from '../components/SkillSnapCard';
import CertificateViewer from '../components/CertificateViewer';
import LoginModal from '../components/LoginModal';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: ''
  });

  const [showQuiz, setShowQuiz] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const sampleSkillSnaps = [
    {
      title: "Computer Basics: Getting Started",
      duration: "12 min",
      description: "Learn fundamental computer operations and navigation",
      difficulty: "Beginner" as const,
      category: "Digital Literacy",
      isCompleted: true
    },
    {
      title: "Email Communication Skills",
      duration: "15 min", 
      description: "Master professional email writing and management",
      difficulty: "Beginner" as const,
      category: "Communication"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your interest! We will contact you soon.');
    setShowQuiz(true);
    setFormData({ name: '', email: '', location: '' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                SkillBridge: <span className="text-blue-300">Digital Skills for All</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Empowering rural youth and women by providing tailored digital skills training 
                to unlock their potential and transform their futures.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center">
                  onClick={() => setShowQuiz(true)}
                  Unlock Your Digital Future
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button 
                  onClick={() => setShowLogin(true)}
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
                >
                  Get Started
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <img 
                  src="https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Rural learners using digital devices" 
                  className="rounded-lg shadow-2xl w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About SkillBridge Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About SkillBridge</h2>
            <p className="text-lg text-gray-600 mb-6">
              SkillBridge offers a flexible, engaging platform that addresses the unique challenges 
              faced by learners in rural India.
            </p>
            <p className="text-lg text-gray-600">
              By emphasizing personalized skill tracks and microlearning, it empowers individuals 
              to acquire vital digital skills at their own pace, bridging the gap to job opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Makes Us Unique</h2>
            <p className="text-lg text-gray-600">Our innovative approach to digital skills training</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Precision Over Volume</h3>
              <p className="text-gray-600">
                We focus on delivering targeted, high-quality content that matches individual learner 
                needs rather than overwhelming them with excessive information.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Microlearning Format</h3>
              <p className="text-gray-600">
                Daily 10-15 minute lessons designed for busy schedules, making learning manageable 
                and sustainable for working individuals.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Wifi className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Lightweight, Offline-First Design</h3>
              <p className="text-gray-600">
                Built for low-connectivity environments, our platform works seamlessly on basic 
                devices with minimal internet requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Daily SkillSnaps Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Daily SkillSnaps</h2>
            <p className="text-lg text-gray-600 mb-6">
              Bite-sized learning designed for your busy schedule
            </p>
            <p className="text-gray-600">
              Each lesson takes just 10-15 minutes and builds practical skills you can use immediately
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            {sampleSkillSnaps.map((snap, index) => (
              <SkillSnapCard key={index} {...snap} />
            ))}
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => setShowLogin(true)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center mx-auto"
            >
              <Play className="mr-2 h-5 w-5" />
              Access Full Learning Platform
            </button>
          </div>
        </div>
      </section>

      {/* Certificate Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Verifiable Certificates</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Earn QR-coded certificates that employers can instantly verify. No complex blockchain - 
                  just simple, credible validation of your new skills.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <div className="bg-green-100 rounded-full p-1 mr-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Instantly generated upon course completion</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-green-100 rounded-full p-1 mr-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">QR code for quick verification</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-green-100 rounded-full p-1 mr-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Recognized by local employers</span>
                  </li>
                </ul>
                <button 
                  onClick={() => setShowCertificate(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center"
                >
                  <Award className="mr-2 h-5 w-5" />
                  View Sample Certificate
                </button>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border-2 border-blue-200">
                  <div className="text-center">
                    <Award className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Certificate Preview</h3>
                    <p className="text-gray-600 text-sm mb-4">Digital Marketing Essentials</p>
                    <div className="bg-white p-3 rounded-lg inline-block">
                      <div className="w-16 h-16 bg-gray-200 rounded border-2 border-dashed border-gray-400 flex items-center justify-center">
                        <span className="text-xs text-gray-500">QR Code</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unlock Digital Future Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Unlock Your Digital Future</h2>
            <p className="text-blue-100 mb-8 text-lg">
              Join thousands of rural learners who are transforming their careers with digital skills.
            </p>
            
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>
              <input
                type="text"
                name="location"
                placeholder="Your Location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 mb-6"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
              >
                Unlock Digital Potential
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Modals */}
      {showQuiz && (
        <OnboardingQuiz 
          onComplete={(results) => {
            console.log('Quiz results:', results);
            setShowQuiz(false);
            setShowLogin(true);
          }}
          onClose={() => setShowQuiz(false)}
        />
      )}

      <CertificateViewer 
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
        certificateData={{
          studentName: "Priya Sharma",
          courseName: "Digital Marketing Essentials",
          completionDate: "March 15, 2024",
          certificateId: "SB-2024-DM-001"
        }}
      />

      <LoginModal 
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={(credentials) => console.log('Login:', credentials)}
      />
    </div>
  );
};

export default Home;