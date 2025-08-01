import React from 'react';
import { User, Flame } from 'lucide-react';

const Dashboard = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white relative">
      {/* Beautiful ZenQuest Header */}
      <div className="relative py-2" style={{background: '#372974'}}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 px-6">
            <div className="flex items-center">
              <img 
                src="/images/zenquest 2.png" 
                alt="ZenQuest Logo" 
                className="w-auto object-contain"
                style={{height: '88px'}}
              />
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-4 right-20 w-32 h-32 bg-orange-400 bg-opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-8 right-40 w-20 h-20 bg-purple-400 bg-opacity-10 rounded-full blur-2xl"></div>
      </div>

      {/* Main Content Container */}
      <div className="p-6 pb-24">      
        <div className="max-w-sm mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Hello!</p>
                  <h2 className="text-xl font-bold text-gray-900">Fellycia Alvira</h2>
                </div>
              </div>
              
              {/* Streak Counter */}
              <div className="flex items-center space-x-2 bg-orange-50 px-4 py-2 rounded-full">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="text-orange-600 font-bold text-sm">7</span>
              </div>
            </div>
          </div>

          {/* Progress to Your Future Card */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Progress to your future</h3>
            
            <div className="rounded-[24px] p-5 text-white relative overflow-hidden" style={{background: 'linear-gradient(135deg, #ee7e5c 0%, #372974 60%, #372974 100%)'}}>
              <div className="relative z-10 pr-20">
                <h4 className="text-xl font-bold mb-1 leading-tight">Your</h4>
                <h4 className="text-xl font-bold mb-3 leading-tight">Learning Journey</h4>
                <p className="text-orange-100 mb-4 text-xs opacity-90 leading-relaxed">
                  Keep building your skills.<br />
                  Every step counts toward your goals.
                </p>
                <button 
                  onClick={() => onNavigate && onNavigate('learning-journey')}
                  className="bg-white text-orange-500 px-6 py-2 rounded-full font-semibold text-xs hover:bg-orange-50 transition-colors"
                >
                  Continue Learning
                </button>
              </div>
              
              {/* Beautiful Progress Circle */}
              <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
                <div className="relative">
                  {/* Progress background */}
                  <div className="w-16 h-16 rounded-full bg-white bg-opacity-10 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-lg font-bold text-white leading-none">67%</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress arc */}
                  <svg className="absolute inset-0 w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="3"
                      fill="none"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="white"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="175.9"
                      strokeDashoffset="58"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Streak Details */}
          <div className="bg-gray-50 rounded-[20px] p-5 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-bold text-gray-900">Your Streak</h4>
              <Flame className="w-5 h-5 text-orange-500" />
            </div>
            
            <div className="flex items-center space-x-4 mb-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">7</div>
                <div className="text-xs text-gray-600">Day streak</div>
              </div>
              <div className="flex-1 h-px bg-gray-200"></div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-700">12</div>
                <div className="text-xs text-gray-600">Longest</div>
              </div>
            </div>
            
            {/* Weekly Streak Visualization */}
            <div className="flex justify-between items-center">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                <div key={day} className="text-center">
                  <div className="text-xs text-gray-500 mb-1">{day}</div>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                    index < 5 ? 'bg-orange-500' : 'bg-gray-200'
                  }`}>
                    {index < 5 && <Flame className="w-3 h-3 text-white" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Report */}
          <div className="bg-gray-50 rounded-[20px] p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-gray-900">Skill Report</h4>
              <span className="text-xs text-gray-500">This week</span>
            </div>
            
            <div className="space-y-4">
              {/* JavaScript */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">JavaScript</span>
                  <span className="text-xs text-gray-500">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              {/* React */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">React</span>
                  <span className="text-xs text-gray-500">72%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>
              
              {/* CSS */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">CSS</span>
                  <span className="text-xs text-gray-500">91%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                </div>
              </div>
              
              {/* Node.js */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Node.js</span>
                  <span className="text-xs text-gray-500">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;