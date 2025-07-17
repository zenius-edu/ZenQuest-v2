import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, User, BookOpen, Target, Clock, Star } from 'lucide-react';

const LearningJourney = ({ onNavigate }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({
    learningGoal: '',
    currentLevel: '',
    timeCommitment: '',
    learningStyle: '',
    motivation: ''
  });

  const questions = [
    {
      id: 'learningGoal',
      title: 'What do you want to learn?',
      subtitle: 'Tell us about your learning goal',
      icon: <Target className="w-8 h-8 text-orange-500" />,
      placeholder: 'e.g., I want to master web development, learn Spanish, understand data science...',
      type: 'textarea'
    },
    {
      id: 'currentLevel',
      title: 'What\'s your current level?',
      subtitle: 'Help us understand where you\'re starting from',
      icon: <BookOpen className="w-8 h-8 text-orange-500" />,
      placeholder: 'e.g., Complete beginner, have some basic knowledge, intermediate...',
      type: 'textarea'
    },
    {
      id: 'timeCommitment',
      title: 'How much time can you dedicate?',
      subtitle: 'What\'s your preferred learning schedule?',
      icon: <Clock className="w-8 h-8 text-orange-500" />,
      placeholder: 'e.g., 30 minutes daily, 2 hours on weekends, flexible schedule...',
      type: 'textarea'
    },
    {
      id: 'learningStyle',
      title: 'How do you prefer to learn?',
      subtitle: 'What learning methods work best for you?',
      icon: <User className="w-8 h-8 text-orange-500" />,
      placeholder: 'e.g., Visual learner, hands-on practice, reading, videos, interactive exercises...',
      type: 'textarea'
    },
    {
      id: 'motivation',
      title: 'What motivates you to learn this?',
      subtitle: 'Share your "why" behind this learning journey',
      icon: <Star className="w-8 h-8 text-orange-500" />,
      placeholder: 'e.g., Career advancement, personal interest, solving a problem...',
      type: 'textarea'
    }
  ];

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Learning Journey Answers:', answers);
    // Here you would typically send the data to your backend
    // Navigate to course result page
    if (onNavigate) {
      onNavigate('course-result');
    }
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Mobile optimized container */}
      <div className="px-4 py-6 pb-24">
        <div className="max-w-full mx-auto bg-white rounded-[24px] shadow-xl overflow-hidden min-h-[calc(100vh-8rem)]">
          
          {/* Header - Mobile optimized */}
          <div className="p-4 pb-2">
            <div className="text-center mb-4">
              <h1 className="text-lg font-bold text-gray-900">Create Learning Journey</h1>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Question Content - Mobile optimized */}
          <div className="px-4 flex-1 flex flex-col justify-center">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                {currentQ.icon}
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{currentQ.title}</h2>
              <p className="text-gray-600 text-sm px-2">{currentQ.subtitle}</p>
            </div>

            {/* Answer Input - Mobile optimized */}
            <div className="mb-6">
              <textarea
                value={answers[currentQ.id]}
                onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                placeholder={currentQ.placeholder}
                className="w-full h-28 p-4 bg-gray-50 rounded-[16px] border-0 resize-none focus:outline-none focus:ring-2 focus:ring-orange-200 text-gray-700 placeholder-gray-500 text-sm leading-relaxed"
                rows={3}
              />
            </div>
          </div>

          {/* Navigation - Mobile optimized */}
          <div className="p-4 pt-0">
            <div className="flex justify-between items-center gap-3">
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className={`flex items-center space-x-2 px-4 py-3 rounded-full font-semibold transition-colors text-sm ${
                  currentQuestion === 0 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={!answers[currentQ.id].trim()}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-colors text-sm ${
                    answers[currentQ.id].trim()
                      ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span>Create Journey</span>
                  <Star className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  disabled={!answers[currentQ.id].trim()}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-colors text-sm ${
                    answers[currentQ.id].trim()
                      ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Question Dots Indicator */}
          <div className="flex justify-center space-x-2 pb-4">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentQuestion 
                    ? 'bg-orange-500' 
                    : index < currentQuestion 
                      ? 'bg-orange-300' 
                      : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningJourney; 