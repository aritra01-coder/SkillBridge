import React from 'react';
import { Code, Database, Smartphone, Zap } from 'lucide-react';

const Technology = () => {
  const techStack = [
    {
      icon: <Code className="h-8 w-8 text-blue-500" />,
      title: "Java Frontend",
      description: "User-friendly Java-based GUI for intuitive interaction and seamless user experience across all devices."
    },
    {
      icon: <Database className="h-8 w-8 text-green-500" />,
      title: "Python Backend",
      description: "Efficient Python backend for robust logic handling, content management, and system operations."
    },
    {
      icon: <Smartphone className="h-8 w-8 text-purple-500" />,
      title: "SQLite Database",
      description: "Lightweight local database using SQLite, ensuring functionality even in offline environments."
    },
    {
      icon: <Zap className="h-8 w-8 text-orange-500" />,
      title: "Optimized Performance",
      description: "Lightweight design making it accessible for users with low-end devices and limited bandwidth."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Technical Outline
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Simple and Realistic Implementation - Overview of our technology stack for SkillBridge development
          </p>
        </div>
      </section>

      {/* Technology Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Technology Architecture</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-lg text-gray-700 mb-4">
                  SkillBridge's architecture combines <strong>Java for user interfaces</strong> and <strong>Python for backend logic</strong>.
                </p>
                <p className="text-lg text-gray-700 mb-4">
                  It utilizes <strong>SQLite for local databases</strong>, ensuring functionality even offline.
                </p>
                <p className="text-lg text-gray-700">
                  Our solution prioritizes lightweight design, making it accessible for users with low-end devices while providing opportunities for growth and skill development.
                </p>
              </div>
              <div>
                <p className="text-lg text-gray-700 mb-4">
                  The frontend utilizes <strong>Java for a user-friendly experience</strong>, while <strong>Python powers the backend</strong> for efficient logic handling and content management.
                </p>
                <p className="text-lg text-gray-700">
                  This combination ensures an engaging platform that meets the needs of rural learners with low bandwidth and device limitations.
                </p>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {techStack.map((tech, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-gray-50 p-3 rounded-lg mr-4">
                    {tech.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{tech.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why This Technology Stack?</h2>
            <p className="text-lg text-gray-600">Built for reliability, accessibility, and performance</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Proven Technologies</h3>
              <p className="text-gray-600">
                Using established, reliable technologies that are well-documented and widely supported.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Low-End Device Support</h3>
              <p className="text-gray-600">
                Optimized for devices with limited processing power and memory constraints.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Offline Capability</h3>
              <p className="text-gray-600">
                Local database ensures full functionality even without internet connectivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to See Our Technology in Action?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Learn more about the team behind SkillBridge and how we're making digital education accessible.
          </p>
          <a 
            href="/about" 
            className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Meet Our Team
          </a>
        </div>
      </section>
    </div>
  );
};

export default Technology;