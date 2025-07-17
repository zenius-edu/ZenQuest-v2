import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, User, BookOpen, Target, Clock, Star } from 'lucide-react';

const LearningJourney = ({ onNavigate }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    console.log('Learning Quest Answer:', answer);
    // Here you would typically send the data to your backend
    // Navigate to course result page
    if (onNavigate) {
      onNavigate('course-result');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile optimized container */}
      <div className="px-4 py-6 pb-24">
        <div className="max-w-full mx-auto bg-white rounded-[24px] overflow-hidden min-h-[calc(100vh-8rem)]">
          
          {/* Header - Mobile optimized */}
          <div className="p-4 pb-2">
            <div className="text-center mb-4">
              <h1 className="text-lg font-bold text-gray-900">Create Your Learning Quest</h1>
            </div>
          </div>

          {/* Question Content - Mobile optimized */}
          <div className="px-4 flex-1 flex flex-col justify-center">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <Target className="w-8 h-8 text-orange-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight">What do you want to learn?</h2>
              <p className="text-gray-600 text-sm px-2">Tell us about your learning goals and we'll create the perfect quest for you</p>
            </div>

            {/* Answer Input - Mobile optimized */}
            <div className="mb-6">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="e.g., I want to master web development, learn data science, improve my programming skills..."
                className="w-full h-32 p-4 bg-gray-50 rounded-[16px] border-0 resize-none focus:outline-none focus:ring-2 focus:ring-orange-200 text-gray-700 placeholder-gray-500 text-sm leading-relaxed"
                rows={4}
              />
            </div>
          </div>

          {/* Navigation - Mobile optimized */}
          <div className="p-4 pt-0">
            <button
              onClick={handleSubmit}
              disabled={!answer.trim()}
              className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-full font-semibold transition-colors text-sm ${
                answer.trim()
                  ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>Create My Quest</span>
              <Target className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningJourney; 