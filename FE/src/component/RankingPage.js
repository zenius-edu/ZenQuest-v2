import React, { useState } from 'react';
import { Trophy, Star, Flame, Medal, Award, Crown } from 'lucide-react';

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
    { id: 1, title: "First Quiz", icon: "🎯", completed: true },
    { id: 2, title: "Week Streak", icon: "🔥", completed: true },
    { id: 3, title: "Quiz Master", icon: "🧠", completed: true },
    { id: 4, title: "Speed Reader", icon: "⚡", completed: true },
    { id: 5, title: "Night Owl", icon: "🦉", completed: false },
    { id: 6, title: "Perfect Score", icon: "💯", completed: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pb-24">
        
        {/* Simple Header */}
        <div className="bg-white px-6 py-8 shadow-sm">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Rankings</h1>
            <p className="text-gray-600 text-sm mt-1">Your learning progress</p>
          </div>

          {/* User Stats */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-orange-600">2,847</div>
                <div className="text-xs text-gray-600">XP Points</div>
              </div>
              <div>
                <div className="text-xl font-bold text-purple-600">#12</div>
                <div className="text-xs text-gray-600">Rank</div>
              </div>
              <div>
                <div className="text-xl font-bold text-red-500">7</div>
                <div className="text-xs text-gray-600">Day Streak</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-4">
          <div className="flex bg-white rounded-xl border border-gray-200 overflow-hidden">
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`flex-1 py-3 text-sm font-medium transition-colors duration-200 ${
                activeTab === 'leaderboard'
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🏆 Leaderboard
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`flex-1 py-3 text-sm font-medium transition-colors duration-200 ${
                activeTab === 'achievements'
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🏅 Achievements
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6">
          {activeTab === 'leaderboard' && (
            <div className="space-y-3">
              {leaderboardData.map((user, index) => (
                <div
                  key={user.id}
                  className={`bg-white rounded-xl p-4 border transition-all duration-200 ${
                    user.name === "Fellycia Alvira"
                      ? 'border-orange-300 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Rank */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-yellow-100 text-yellow-600' :
                      index === 1 ? 'bg-gray-100 text-gray-600' :
                      index === 2 ? 'bg-orange-100 text-orange-600' :
                      'bg-gray-50 text-gray-500'
                    }`}>
                      {index + 1}
                    </div>

                    {/* Avatar & Crown for top 3 */}
                    <div className="relative">
                      <div className="text-2xl">{user.avatar}</div>
                      {index < 3 && (
                        <div className="absolute -top-2 -right-1 text-lg">
                          {index === 0 ? '👑' : index === 1 ? '🥈' : '🥉'}
                        </div>
                      )}
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      <div className="flex items-center space-x-3 mt-1">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-orange-500" />
                          <span className="text-xs text-gray-600">{user.points.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Flame className="w-3 h-3 text-red-500" />
                          <span className="text-xs text-gray-600">{user.streak}d</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Medal className="w-3 h-3 text-purple-500" />
                          <span className="text-xs text-gray-600">Lv.{user.level}</span>
                        </div>
                      </div>
                    </div>

                    {/* You badge */}
                    {user.name === "Fellycia Alvira" && (
                      <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        You
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-4">
              {/* Stats Summary */}
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-3">Achievement Progress</h3>
                  <div className="flex justify-center space-x-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">4</div>
                      <div className="text-xs text-gray-600">Unlocked</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-400">2</div>
                      <div className="text-xs text-gray-600">Locked</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievement Grid */}
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`bg-white rounded-xl p-4 border text-center transition-all duration-200 ${
                      achievement.completed
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 opacity-60'
                    }`}
                  >
                    <div className={`text-3xl mb-2 ${achievement.completed ? '' : 'grayscale'}`}>
                      {achievement.icon}
                    </div>
                    <h4 className={`font-medium text-sm ${
                      achievement.completed ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {achievement.title}
                    </h4>
                    {achievement.completed && (
                      <div className="flex items-center justify-center mt-2">
                        <Award className="w-3 h-3 text-green-500 mr-1" />
                        <span className="text-xs text-green-600">Unlocked</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Challenge Teaser */}
              <div className="bg-gradient-to-r from-orange-500 to-purple-500 rounded-xl p-4 text-white text-center mt-6">
                <h3 className="font-semibold mb-2">Weekly Challenge</h3>
                <p className="text-sm opacity-90 mb-3">Complete 5 HTML lessons this week</p>
                <div className="bg-white bg-opacity-20 rounded-full h-2 mb-2">
                  <div className="bg-white h-2 rounded-full w-3/5"></div>
                </div>
                <p className="text-xs opacity-75">3/5 completed • 3 days left</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RankingPage; 