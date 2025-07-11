import React from 'react';
import { Users, Target, Zap, Award, BookOpen, Globe } from 'lucide-react';

const About = () => {
  const teamMembers = [
    { name: "Aritra Basu", role: "Lead Developer" },
    { name: "Rima Dutta", role: "UI/UX Designer" },
    { name: "Ejaz Ahmed", role: "Backend Developer" },
    { name: "Medha Gupta", role: "Content Strategist" },
    { name: "Sayan Bandyopadhyay", role: "Product Manager" }
  ];

  const implementationAspects = [
    {
      icon: <BookOpen className="h-8 w-8 text-blue-500" />,
      title: "User-friendly Java-based GUI",
      description: "Intuitive interface designed for easy interaction across all user skill levels"
    },
    {
      icon: <Zap className="h-8 w-8 text-green-500" />,
      title: "Python backend",
      description: "Efficient content management and robust system performance"
    },
    {
      icon: <Target className="h-8 w-8 text-purple-500" />,
      title: "Lightweight local database using SQLite",
      description: "Ensuring functionality even in offline environments"
    },
    {
      icon: <Users className="h-8 w-8 text-orange-500" />,
      title: "Seamless mentor connection",
      description: "Simple forms enabling direct connection with industry mentors"
    }
  ];

  const learnerBenefits = [
    {
      icon: <Target className="h-8 w-8 text-blue-500" />,
      title: "Customized learning paths",
      description: "Tailored specifically for individual needs and career goals"
    },
    {
      icon: <Globe className="h-8 w-8 text-green-500" />,
      title: "Offline capabilities",
      description: "Full accessibility for learners in rural areas with limited connectivity"
    },
    {
      icon: <Award className="h-8 w-8 text-purple-500" />,
      title: "Quick, verifiable certificates",
      description: "Instantly credible achievements that enhance professional credibility"
    },
    {
      icon: <Zap className="h-8 w-8 text-orange-500" />,
      title: "Focus on microlearning",
      description: "Promotes sustainable daily engagement and skill development"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Built by Students, Powered by Code
          </h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            A passionate team of students creating innovative solutions for digital education accessibility
          </p>
        </div>
      </section>

      {/* Implementation Aspects */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Aspects of Implementation</h2>
            <p className="text-lg text-gray-600">Our technical approach to solving real-world challenges</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {implementationAspects.map((aspect, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-gray-50 p-3 rounded-lg mr-4">
                    {aspect.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{aspect.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {aspect.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits for Learners */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits for Learners</h2>
            <p className="text-lg text-gray-600">How SkillBridge transforms the learning experience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {learnerBenefits.map((benefit, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-white p-3 rounded-lg mr-4 shadow-sm">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{benefit.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-blue-100 mb-8">
              Students from International Management Institute, Kolkata
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-center">
                  <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                  <p className="text-blue-100">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-blue-100 text-lg">
              International Management Institute, Kolkata
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Our Mission?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Be part of the movement to make digital education accessible to everyone.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;