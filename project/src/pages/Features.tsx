import React from 'react';
import { Brain, Calendar, WifiOff, Globe, Award, Smartphone, Users } from 'lucide-react';
import SkillSnapCard from '../components/SkillSnapCard';

const Features = () => {
  const sampleSkillSnaps = [
    {
      title: "Digital Payment Systems",
      duration: "10 min",
      description: "Learn to use UPI, mobile banking, and digital wallets safely",
      difficulty: "Beginner" as const,
      category: "Financial Literacy",
      isOfflineAvailable: true
    },
    {
      title: "Social Media for Business",
      duration: "15 min", 
      description: "Create engaging content to promote your local business",
      difficulty: "Intermediate" as const,
      category: "Digital Marketing",
      isOfflineAvailable: true
    },
    {
      title: "Online Job Applications",
      duration: "12 min",
      description: "Navigate job portals and create compelling applications",
      difficulty: "Beginner" as const,
      category: "Career Skills",
      isOfflineAvailable: true
    }
  ];

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-blue-500" />,
      title: "Aptitude-Based Onboarding",
      description: "Personalized entry points for learners to maximize engagement and success.",
      details: [
        "Our platform creates customized tracks based on individual aptitude, interests, and job relevance.",
        "A brief quiz efficiently determines users' current levels, guiding them to the right starting point.",
        "Personalized recommendations ensure learners focus on skills most relevant to their goals."
      ]
    },
    {
      icon: <Calendar className="h-8 w-8 text-green-500" />,
      title: "Customized Skill Tracks / Daily SkillSnaps",
      description: "Daily microlearning lessons tailored to user needs for effective learning.",
      details: [
        "Learners receive engaging 10-15 minute lessons daily, focusing on specific digital skills relevant to their goals.",
        "Content is broken down into digestible chunks that fit into busy schedules.",
        "Progressive skill building ensures steady advancement without overwhelming learners."
      ]
    },
    {
      icon: <WifiOff className="h-8 w-8 text-purple-500" />,
      title: "Offline-First Design",
      description: "Why we prioritize low-connectivity solutions for effective learning experiences.",
      details: [
        "SkillBridge is designed to operate efficiently even in low-connectivity areas, ensuring users can access content anytime.",
        "Our platform runs smoothly on low-end devices with minimal system requirements.",
        "Learners only need to connect to the internet occasionally to sync their progress and download new content."
      ]
    },
    {
      icon: <Smartphone className="h-8 w-8 text-purple-500" />,
      title: "Low-End Device Optimization",
      description: "Designed specifically for basic smartphones and older computers commonly used in rural areas.",
      details: [
        "Minimal system requirements ensure compatibility with devices as old as 5-7 years.",
        "Efficient memory usage and optimized graphics reduce lag and crashes.",
        "Simple interface design reduces cognitive load and improves usability for new users."
      ]
    },
    {
      icon: <Globe className="h-8 w-8 text-orange-500" />,
      title: "Local Language Support",
      description: "Content is available in local languages, making it accessible for everyone, even on low-end devices.",
      details: [
        "Multilingual content ensures learners can study in their preferred language.",
        "Cultural context is incorporated to make learning more relevant and engaging.",
        "Text-based content reduces bandwidth requirements while maintaining effectiveness."
      ]
    },
    {
      icon: <Award className="h-8 w-8 text-red-500" />,
      title: "Verifiable Certificates",
      description: "Simplified approach ensuring credibility without complex blockchain technology for learners' achievements.",
      details: [
        "QR-Coded Certificates: Easily generated with Python libraries for instant verification.",
        "Practical Validation: No complex dependencies or integrations needed for employers to verify skills.",
        "Student-Friendly Design: Built for ease with technology students understand and trust."
      ]
    },
    {
      icon: <Users className="h-8 w-8 text-green-500" />,
      title: "Community Learning Support",
      description: "Connect with local mentors and peer groups for collaborative learning experiences.",
      details: [
        "Local coordinator network provides in-person support when needed.",
        "Peer learning groups foster community engagement and motivation.",
        "Simple mentor connection forms enable direct access to industry professionals."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            What Makes SkillBridge Unique
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Our Innovative Approach to Digital Skills Training
          </p>
        </div>
      </section>

      {/* SkillSnaps Demo Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Daily SkillSnaps in Action</h2>
            <p className="text-lg text-gray-600 mb-6">
              See how our microlearning approach makes complex skills accessible
            </p>
            <p className="text-gray-600">
              Each lesson is designed to fit into your daily routine, whether you're at home, work, or commuting
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {sampleSkillSnaps.map((snap, index) => (
              <SkillSnapCard key={index} {...snap} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {features.map((feature, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                <div className="flex-1">
                  <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <div className="flex items-center mb-6">
                      <div className="bg-gray-50 p-3 rounded-lg mr-4">
                        {feature.icon}
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">{feature.title}</h2>
                    </div>
                    <p className="text-lg text-gray-700 mb-6 font-medium">
                      {feature.description}
                    </p>
                    <ul className="space-y-3">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <div className="bg-blue-100 rounded-full p-1 mt-1 mr-3 flex-shrink-0">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          </div>
                          <span className="text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <img 
                      src={`https://images.pexels.com/photos/${index === 0 ? '3184465' : index === 1 ? '3184418' : index === 2 ? '3184398' : index === 3 ? '3184360' : '3184291'}/pexels-photo-${index === 0 ? '3184465' : index === 1 ? '3184418' : index === 2 ? '3184398' : index === 3 ? '3184360' : '3184291'}.jpeg?auto=compress&cs=tinysrgb&w=600`}
                      alt={`Illustration of ${feature.title}`}
                      className="rounded-2xl shadow-lg w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience These Features?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of learners who are already transforming their futures with SkillBridge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/technology" 
              className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Learn About Our Technology
            </a>
            <a 
              href="/contact" 
              className="inline-flex items-center border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;