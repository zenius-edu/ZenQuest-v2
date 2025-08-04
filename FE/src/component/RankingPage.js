import React, { useState } from 'react';
import { Trophy, Star, Flame, Medal, Award, Crown, TrendingUp, Target } from 'lucide-react';

const RankingPage = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('leaderboard');

  // Simplified leaderboard data
  const leaderboardData = [
    { id: 1, name: "Alex Chen", avatar: "🧑‍💻", points: 4250, level: 15, streak: 45 },
    { id: 2, name: "Sarah Wilson", avatar: "👩‍🎨", points: 3890, level: 14, streak: 32 },
    { id: 3, name: "Marcus Johnson", avatar: "👨‍🔬", points: 3654, level: 13, streak: 28 },
    { id: 4, name: "Emma Davis", avatar: "👩‍💼", points: 3420, level: 12, streak: 24 },
    { id: 5, name: "David Kim", avatar: "👨‍🎓", points: 3187, level: 11, streak: 19 },
    { id: 12, name: "Fellycia Alvira", avatar: "👩‍💻", points: 2847, level: 9, streak: 7 }
  ];

  // Simplified achievements
  const achievements = [
    { id: 1, title: "First Quest", icon: "🎯", completed: true, description: "Complete your first learning quest" },
    { id: 2, title: "Week Warrior", icon: "🔥", completed: true, description: "Maintain a 7-day streak" },
    { id: 3, title: "Quiz Master", icon: "🧠", completed: true, description: "Score 100% on 5 quizzes" },
    { id: 4, title: "Speed Learner", icon: "⚡", completed: true, description: "Complete 3 lessons in one day" },
    { id: 5, title: "Night Scholar", icon: "🦉", completed: false, description: "Study after 10 PM for 5 days" },
    { id: 6, title: "Perfect Score", icon: "💯", completed: false, description: "Get perfect scores on 10 quizzes" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pb-24">
        
        {/* Modern Header */}
        <div className="px-6 py-12 pb-16" style={{background: 'linear-gradient(135deg, #ee7e5c 0%, #372974 100%)'}}>
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-3xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Rankings</h1>
            <p className="text-white text-opacity-90">Compete with learners worldwide</p>
          </div>

          {/* Enhanced User Stats Card */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">👩‍💻</div>
              <h3 className="text-lg font-semibold text-white">Fellycia Alvira</h3>
              <div className="flex items-center justify-center space-x-2 mt-1">
                <Medal className="w-4 h-4 text-yellow-300" />
                <span className="text-white text-opacity-90 text-sm">Level 9</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Star className="w-6 h-6 text-orange-300" />
                </div>
                <div className="text-xl font-bold text-white">2,847</div>
                <div className="text-xs text-white text-opacity-70">XP Points</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-purple-300" />
                </div>
                <div className="text-xl font-bold text-white">#12</div>
                <div className="text-xs text-white text-opacity-70">Global Rank</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-500 bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Flame className="w-6 h-6 text-red-300" />
                </div>
                <div className="text-xl font-bold text-white">7</div>
                <div className="text-xs text-white text-opacity-70">Day Streak</div>
              </div>
            </div>
          </div>
          
          {/* Curved Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gray-50" style={{
            borderRadius: '50% 50% 0 0 / 100% 100% 0 0'
          }}></div>
        </div>

        {/* Enhanced Tab Navigation */}
        <div className="px-6 -mt-6 relative z-10">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2 mb-6">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveTab('leaderboard')}
                className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === 'leaderboard'
                    ? 'text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                style={activeTab === 'leaderboard' ? {background: '#372974'} : {}}
              >
                <Trophy className="w-4 h-4" />
                <span>Leaderboard</span>
              </button>
              <button
                onClick={() => setActiveTab('achievements')}
                className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === 'achievements'
                    ? 'text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                style={activeTab === 'achievements' ? {background: '#372974'} : {}}
              >
                <Award className="w-4 h-4" />
                <span>Achievements</span>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Content */}
        <div className="px-6">
          {activeTab === 'leaderboard' && (
            <div className="space-y-4">
              {leaderboardData.map((user, index) => (
                <div
                  key={user.id}
                  className={`bg-white rounded-2xl p-5 shadow-sm border transition-all duration-200 hover:shadow-md ${
                    user.name === "Fellycia Alvira"
                      ? 'border-orange-200 bg-gradient-to-r from-orange-50 to-purple-50 ring-2 ring-orange-100'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Enhanced Rank Badge */}
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold relative ${
                      index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white shadow-lg' :
                      index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white shadow-lg' :
                      index === 2 ? 'bg-gradient-to-br from-orange-300 to-orange-400 text-white shadow-lg' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {index + 1}
                      {index < 3 && (
                        <div className="absolute -top-1 -right-1 text-lg">
                          {index === 0 ? '👑' : index === 1 ? '🥈' : '🥉'}
                        </div>
                      )}
                    </div>

                    {/* Enhanced Avatar */}
                    <div className="relative">
                      <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl">
                        {user.avatar}
                      </div>
                    </div>

                    {/* Enhanced User Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{user.name}</h3>
                        {user.name === "Fellycia Alvira" && (
                          <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            You
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="flex items-center space-x-1">
                          <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Star className="w-3 h-3 text-orange-500" />
                          </div>
                          <span className="text-xs text-gray-600 font-medium">{user.points.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center">
                            <Flame className="w-3 h-3 text-red-500" />
                          </div>
                          <span className="text-xs text-gray-600 font-medium">{user.streak}d</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{backgroundColor: '#372974'}}>
                            <Medal className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-xs text-gray-600 font-medium">Lv.{user.level}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-6">
              {/* Enhanced Stats Summary */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Achievement Progress</h3>
                  <p className="text-sm text-gray-600">Keep unlocking new achievements!</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Award className="w-8 h-8 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold text-green-600 mb-1">4</div>
                    <div className="text-sm text-gray-600">Unlocked</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Target className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="text-2xl font-bold text-gray-400 mb-1">2</div>
                    <div className="text-sm text-gray-600">Locked</div>
                  </div>
                </div>
              </div>

              {/* Enhanced Achievement Grid */}
              <div className="grid grid-cols-1 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`bg-white rounded-2xl p-5 border transition-all duration-200 ${
                      achievement.completed
                        ? 'border-green-200 bg-gradient-to-r from-green-50 to-blue-50 shadow-sm'
                        : 'border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${
                        achievement.completed ? 'bg-green-100' : 'bg-gray-100 grayscale'
                      }`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className={`font-semibold ${
                            achievement.completed ? 'text-gray-900' : 'text-gray-500'
                          }`}>
                            {achievement.title}
                          </h4>
                          {achievement.completed && (
                            <div className="flex items-center space-x-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                              <Award className="w-3 h-3" />
                              <span>Unlocked</span>
                            </div>
                          )}
                        </div>
                        <p className={`text-sm ${
                          achievement.completed ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Weekly Challenge */}
              <div className="rounded-2xl p-6 text-white shadow-lg" style={{background: 'linear-gradient(135deg, #ee7e5c 0%, #372974 100%)'}}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Weekly Challenge</h3>
                    <p className="text-white text-opacity-80 text-sm">Complete 5 HTML lessons this week</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-white text-opacity-90">Progress</span>
                    <span className="text-sm font-medium">3/5 completed</span>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-full h-3">
                    <div className="bg-white h-3 rounded-full w-3/5 transition-all duration-300"></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white text-opacity-75">3 days left</span>
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full font-medium">60% Complete</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RankingPage; 