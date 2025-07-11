import React from 'react';
import { Clock, Play, CheckCircle, Download } from 'lucide-react';

interface SkillSnapCardProps {
  title: string;
  duration: string;
  description: string;
  isCompleted?: boolean;
  isOfflineAvailable?: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
}

const SkillSnapCard: React.FC<SkillSnapCardProps> = ({
  title,
  duration,
  description,
  isCompleted = false,
  isOfflineAvailable = true,
  difficulty,
  category
}) => {
  const difficultyColors = {
    'Beginner': 'bg-green-100 text-green-800',
    'Intermediate': 'bg-yellow-100 text-yellow-800',
    'Advanced': 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[difficulty]}`}>
              {difficulty}
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {category}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-3">{description}</p>
        </div>
        {isCompleted && (
          <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          {isOfflineAvailable && (
            <div className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              <span>Offline</span>
            </div>
          )}
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 text-sm font-medium">
          <Play className="h-4 w-4" />
          {isCompleted ? 'Review' : 'Start'}
        </button>
      </div>
    </div>
  );
};

export default SkillSnapCard;