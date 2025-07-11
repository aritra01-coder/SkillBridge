import React from 'react';
import { AlertTriangle, Wifi, TrendingDown } from 'lucide-react';

const Challenges = () => {
  const challenges = [
    {
      icon: <AlertTriangle className="h-8 w-8 text-red-500" />,
      title: "Lack of Personalized Learning",
      description: "Many platforms offer a one-size-fits-all approach, ignoring individual learner needs and local job opportunities.",
      details: "Standard learning paths overlook unique needs and contexts of learners in rural areas. Generic content fails to address specific skill gaps or career aspirations. This lack of personalization leads to disengagement and dropout, as learners struggle to see the relevance of what they're learning to their actual circumstances and goals."
    },
    {
      icon: <Wifi className="h-8 w-8 text-orange-500" />,
      title: "Access Barriers",
      description: "Unstable internet and low-end devices hinder learners from completing traditional courses effectively and consistently.",
      details: "Many learners in rural India face significant obstacles due to unstable internet connections and inadequate devices. These barriers hinder their ability to participate in traditional online courses that require constant connectivity and high-performance hardware. Frequent disconnections and slow loading times create frustration and interrupt the learning process, making it difficult to maintain momentum and complete courses."
    },
    {
      icon: <TrendingDown className="h-8 w-8 text-purple-500" />,
      title: "Untapped Potential",
      description: "As a result of these challenges, many learners drop out early, missing valuable digital job opportunities that can change their lives.",
      details: "The combination of poor personalization and access barriers creates a cycle where talented individuals are unable to develop digital skills that could transform their economic prospects. This represents a massive waste of human potential and perpetuates economic inequality between urban and rural areas."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Challenges in Rural Learning
          </h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Understanding the barriers faced by youth and women in rural India
          </p>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {challenges.map((challenge, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                <div className="flex-1">
                  <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <div className="flex items-center mb-6">
                      <div className="bg-gray-50 p-3 rounded-lg mr-4">
                        {challenge.icon}
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">{challenge.title}</h2>
                    </div>
                    <p className="text-lg text-gray-700 mb-6 font-medium">
                      {challenge.description}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {challenge.details}
                    </p>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <img 
                      src={`https://images.pexels.com/photos/${index === 0 ? '3184302' : index === 1 ? '3184328' : '3184339'}/pexels-photo-${index === 0 ? '3184302' : index === 1 ? '3184328' : '3184339'}.jpeg?auto=compress&cs=tinysrgb&w=600`}
                      alt={`Illustration of ${challenge.title}`}
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
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Overcome These Challenges?</h2>
          <p className="text-xl text-gray-300 mb-8">
            SkillBridge is designed specifically to address each of these barriers with innovative solutions.
          </p>
          <a 
            href="/features" 
            className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Discover Our Solutions
            <AlertTriangle className="ml-2 h-5 w-5 rotate-180" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Challenges;