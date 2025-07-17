import React from 'react';
import { Clock, BookOpen, Target, Play, Plus, Zap, Award } from 'lucide-react';

const CourseResult = ({ onNavigate }) => {
  const courses = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      description: "Master the core concepts of JavaScript programming",
      level: "47",
      accuracy: "75.92%",
      ranking: "Top 0.70% of 1006 users",
      bgColor: "from-blue-400 to-indigo-500",
      levelBg: "bg-indigo-700",
      buttonColor: "text-indigo-600",
      icon: "💻"
    },
    {
      id: 2,
      title: "React Development", 
      description: "Build modern, interactive web applications",
      level: "26",
      accuracy: "75%",
      ranking: "Top 2.65% of 982 users",
      bgColor: "from-emerald-400 to-teal-500",
      levelBg: "bg-teal-700",
      buttonColor: "text-teal-600",
      icon: "⚛️"
    },
    {
      id: 3,
      title: "Node.js Backend",
      description: "Create powerful server-side applications", 
      level: "0",
      accuracy: "0%",
      ranking: "Top 54.73% of 1005 users",
      bgColor: "from-amber-400 to-orange-500",
      levelBg: "bg-orange-700",
      buttonColor: "text-orange-600",
      icon: "🚀"
    },
    {
      id: 4,
      title: "Data Science Basics",
      description: "Learn fundamental data analysis concepts",
      level: "0", 
      accuracy: "0%",
      ranking: "Top 43.78% of 1005 users",
      bgColor: "from-rose-400 to-pink-500",
      levelBg: "bg-pink-700",
      buttonColor: "text-pink-600",
      icon: "📊"
    }
  ];

  const handleRecreateQuest = () => {
    if (onNavigate) {
      onNavigate('learning-journey');
    }
  };

  const handleStudyAll = () => {
    if (onNavigate) {
      onNavigate('quiz');
    }
  };

  const handleStudyByCourse = (courseTitle) => {
    if (onNavigate) {
      onNavigate('quiz');
    }
  };

  const handleRegenerateQuest = () => {
    alert('Regenerating your quest...');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="pb-24">
        <div className="bg-white overflow-hidden">
          
          {/* Enhanced Header - Thinner */}
          <div className="relative bg-gradient-to-r from-orange-400 to-orange-500 px-6 py-6">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-lg font-bold text-white">Your Learning Path</h1>
                <p className="text-orange-100 text-sm mt-1">Personalized just for you</p>
              </div>
            </div>
          </div>

          {/* Create New Quest Section */}
          <div className="px-6 py-4 border-b border-gray-100">
            <button 
              onClick={handleRecreateQuest}
              className="w-full bg-gray-50 hover:bg-gray-100 rounded-[16px] px-4 py-3 transition-all duration-200 active:scale-95 border border-gray-200"
            >
              <div className="flex items-center justify-center space-x-2">
                <Plus className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700 text-sm font-medium">Create New Quest</span>
              </div>
            </button>
          </div>

          {/* Study All Section - Enhanced */}
          <div className="px-6 py-6 border-b border-gray-100">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-2">Quick Challenge</h2>
              <p className="text-gray-600 text-sm">Test your knowledge across all topics</p>
            </div>
            
            <div 
              onClick={handleStudyAll}
              className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-[24px] p-5 cursor-pointer hover:from-orange-500 hover:to-orange-600 transition-all duration-300 active:scale-95"
            >
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Study All</h3>
                    <div className="flex items-center space-x-3 text-orange-100 text-sm">
                      <span>🕐 120 seconds</span>
                      <span>📝 7 questions</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-2">
                  <Play className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Courses Section - Duolingo Style */}
          <div className="px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Study by Course</h2>
                <p className="text-gray-600 text-sm">Choose your learning path</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">{courses.length} courses</span>
              </div>
            </div>

            <div className="space-y-4">
              {courses.map((course) => (
                <div 
                  key={course.id} 
                  className={`bg-gradient-to-r ${course.bgColor} rounded-[32px] p-6 cursor-pointer hover:scale-[1.02] transition-all duration-300 active:scale-95 group shadow-lg`}
                  onClick={() => handleStudyByCourse(course.title)}
                >
                  <div className="flex items-center justify-between">
                    {/* Left side - Level circle and content */}
                    <div className="flex items-center space-x-5">
                      {/* Level Circle */}
                      <div className="relative">
                        <div className="w-16 h-16 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                          <div className={`w-12 h-12 ${course.levelBg} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                            {course.level}
                          </div>
                        </div>
                        <div className="absolute -top-1 -left-1 text-xs text-white font-semibold bg-black bg-opacity-20 px-2 py-1 rounded-full">
                          Level
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-xl mb-1">{course.title}</h3>
                        <div className="space-y-1">
                          <p className="text-white text-opacity-90 text-sm">Accuracy: {course.accuracy}</p>
                          <p className="text-white text-opacity-80 text-xs">{course.ranking}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right side - Mulai button */}
                    <div className="ml-4">
                      <div className="bg-white rounded-full px-6 py-3 shadow-md hover:shadow-lg transition-all">
                        <span className={`font-bold text-sm ${course.buttonColor}`}>Mulai!</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Bottom Section */}
          <div className="px-6 pt-4 pb-0 bg-white border-t border-gray-100">
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Not satisfied with these courses?<br/>
                <span className="font-medium">Regenerate for different options</span>
              </p>
              <button 
                onClick={handleRegenerateQuest}
                className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 active:scale-95 mb-0"
              >
                🎲 Regenerate Quest
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseResult; 