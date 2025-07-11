import React, { useState } from 'react';
import { ChevronRight, CheckCircle, ArrowLeft } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  category: string;
}

interface OnboardingQuizProps {
  onComplete: (results: any) => void;
  onClose: () => void;
}

const OnboardingQuiz: React.FC<OnboardingQuizProps> = ({ onComplete, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "What is your current experience with computers?",
      options: ["Complete beginner", "Basic usage (email, browsing)", "Intermediate (office software)", "Advanced user"],
      category: "technical"
    },
    {
      id: 2,
      question: "Which digital skill interests you most?",
      options: ["Basic computer literacy", "Digital marketing", "Data entry & analysis", "Online business skills"],
      category: "interest"
    },
    {
      id: 3,
      question: "How much time can you dedicate to learning daily?",
      options: ["10-15 minutes", "30 minutes", "1 hour", "More than 1 hour"],
      category: "availability"
    },
    {
      id: 4,
      question: "What is your primary goal?",
      options: ["Find employment", "Start a business", "Improve current job", "Personal development"],
      category: "goal"
    }
  ];

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: answer });
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleComplete = () => {
    const results = {
      level: answers[1]?.includes('beginner') ? 'beginner' : answers[1]?.includes('Basic') ? 'basic' : 'intermediate',
      interest: answers[2],
      timeCommitment: answers[3],
      goal: answers[4]
    };
    onComplete(results);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (isCompleted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full">
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Assessment Complete!</h3>
            <p className="text-gray-600 mb-6">
              We've created a personalized learning path just for you based on your responses.
            </p>
            <div className="space-y-3">
              <button
                onClick={handleComplete}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Start Your Journey
              </button>
              <button
                onClick={onClose}
                className="w-full text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={currentQuestion > 0 ? goBack : onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <span className="text-sm text-gray-500">
            {currentQuestion + 1} of {questions.length}
          </span>
        </div>

        <div className="mb-6">
          <div className="bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {questions[currentQuestion].question}
          </h3>
        </div>

        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-700 group-hover:text-blue-700">{option}</span>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnboardingQuiz;