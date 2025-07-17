import React from 'react';
import { Clock, BookOpen, Target, Play, Plus, Zap, Award } from 'lucide-react';

const CourseResult = ({ onNavigate }) => {
  const courses = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      description: "Master the core concepts of JavaScript programming",
      level: "Beginner",
      bgColor: "from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      icon: "💻"
    },
    {
      id: 2,
      title: "React Development",
      description: "Build modern, interactive web applications",
      level: "Intermediate",
      bgColor: "from-purple-50 to-purple-100",
      borderColor: "border-purple-200",
      icon: "⚛️"
    },
    {
      id: 3,
      title: "Node.js Backend",
      description: "Create powerful server-side applications",
      level: "Advanced",
      bgColor: "from-green-50 to-green-100",
      borderColor: "border-green-200",
      icon: "🚀"
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="pb-24">
        <div className="bg-white shadow-2xl overflow-hidden">
          
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
              className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-[24px] p-5 cursor-pointer hover:from-orange-500 hover:to-orange-600 transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl"
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

          {/* Courses Section - Simplified */}
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
                  className={`bg-gradient-to-r ${course.bgColor} border ${course.borderColor} rounded-[24px] p-5 cursor-pointer hover:shadow-lg transition-all duration-300 active:scale-95 group`}
                  onClick={() => handleStudyByCourse(course.title)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{course.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg leading-tight">{course.title}</h3>
                          <p className="text-gray-700 text-sm leading-relaxed mt-1">{course.description}</p>
                        </div>
                        <div className="ml-4 bg-white bg-opacity-60 rounded-full p-3 group-hover:bg-opacity-80 transition-all">
                          <Play className="w-5 h-5 text-gray-600" />
                        </div>
                      </div>
                      
                      {/* Simplified Level Badge */}
                      <div className="flex items-center space-x-2 mt-3">
                        <Award className="w-4 h-4 text-gray-500" />
                        <span className="bg-white bg-opacity-70 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                          {course.level}
                        </span>
                        <span className="text-sm text-gray-600">• 7 questions</span>
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
                className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 active:scale-95 shadow-lg mb-0"
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