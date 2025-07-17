import React from 'react';
import { Search, Bell, User, Heart } from 'lucide-react';

const Dashboard = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative">
      {/* Main Content Container */}
      <div className="p-6 pb-24">      
        <div className="max-w-sm mx-auto bg-white rounded-[32px] shadow-xl overflow-hidden">
          
          {/* Header */}
          <div className="p-6 pb-4">
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
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full bg-gray-100 rounded-[20px] py-4 pl-12 pr-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-200 border-0"
              />
            </div>
          </div>

          {/* Study Report Card */}
          <div className="px-6 mb-6">
            <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-[28px] p-6 text-white relative overflow-hidden">
              <div className="relative z-10 pr-28">
                <h3 className="text-2xl font-bold mb-1 leading-tight">Your</h3>
                <h3 className="text-2xl font-bold mb-4 leading-tight">Study Report</h3>
                <p className="text-orange-100 mb-6 text-sm opacity-90 leading-relaxed">
                  Lorem ipsum dolor sit amet sectetur.<br />
                  Diam diam pellentesque.
                </p>
                <button className="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold text-sm hover:bg-orange-50 transition-colors">
                  View Details
                </button>
              </div>
              
              {/* Progress Circle - More Proportional */}
              <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
                <div className="relative w-24 h-24">
                  {/* Background circle */}
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="4"
                      fill="none"
                    />
                    {/* Progress circle with rounded caps */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="white"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${87 * 2.51} ${(100-87) * 2.51}`}
                      strokeLinecap="round"
                      strokeDashoffset="0"
                    />
                  </svg>
                  {/* Center text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xl font-bold leading-none">87%</div>
                      <div className="text-xs text-orange-100 mt-1">Progress</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Your Courses */}
          <div className="px-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Your Courses</h3>
              <button className="text-orange-500 font-semibold text-sm">View All</button>
            </div>
            
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {/* Galaxy Course */}
              <div className="flex-shrink-0 w-48 bg-gradient-to-br from-orange-100 to-orange-200 rounded-[24px] p-4 relative">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Galaxy</h4>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  Customize the app to your child's learning pace
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-orange-300 text-orange-800 px-3 py-1 rounded-full text-xs font-medium">Child</span>
                  <span className="bg-orange-300 text-orange-800 px-3 py-1 rounded-full text-xs font-medium">5-8</span>
                  <span className="bg-orange-300 text-orange-800 px-3 py-1 rounded-full text-xs font-medium">Science</span>
                </div>
                <div className="absolute bottom-4 right-4 w-14 h-14">
                  <img 
                    src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=100&h=100&fit=crop" 
                    alt="Saturn" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>

              {/* Language Course */}
              <div className="flex-shrink-0 w-48 bg-gradient-to-br from-purple-100 to-purple-200 rounded-[24px] p-4 relative">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Language</h4>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  Customize the app to your child's learning pace
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-purple-300 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">Child</span>
                  <span className="bg-purple-300 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">5-8</span>
                  <span className="bg-purple-300 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">Spanish</span>
                </div>
                <div className="absolute bottom-4 right-4 w-14 h-14 bg-purple-300 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🗣️</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recommend */}
          <div className="px-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Recommend</h3>
              <button className="text-orange-500 font-semibold text-sm">View All</button>
            </div>
            
            <div className="space-y-3">
              {/* Art & Drawings */}
              <div className="flex items-center space-x-4 bg-gray-50 rounded-[20px] p-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=100&h=100&fit=crop" 
                    alt="Art" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">Art & Drawings</h4>
                  <p className="text-gray-500 text-sm">75 People have participated</p>
                </div>
                <Heart className="w-6 h-6 text-orange-400 fill-current" />
              </div>

              {/* Science Fiction */}
              <div className="flex items-center space-x-4 bg-gray-50 rounded-[20px] p-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=100&h=100&fit=crop" 
                    alt="Science Fiction" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">Science Fiction</h4>
                  <p className="text-gray-500 text-sm">120 People have participated</p>
                </div>
                <Heart className="w-6 h-6 text-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;