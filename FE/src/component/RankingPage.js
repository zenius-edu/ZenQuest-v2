import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Star, Flame, Zap, Crown, Target, BookOpen, Brain, Rocket, Award, TrendingUp, Users, Calendar, Clock } from 'lucide-react';

const RankingPage = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [userRank, setUserRank] = useState(12);
  const [userPoints, setUserPoints] = useState(2847);

  // Mock leaderboard data
  const leaderboardData = [
    { 
      id: 1, 
      name: "Alex Chen", 
      avatar: "🧑‍💻", 
      points: 4250, 
      level: 15, 
      streak: 45, 
      badge: "👑",
      specialty: "JavaScript Master"
    },
    { 
      id: 2, 
      name: "Sarah Wilson", 
      avatar: "👩‍🎨", 
      points: 3890, 
      level: 14, 
      streak: 32, 
      badge: "🏆",
      specialty: "CSS Wizard"
    },
    { 
      id: 3, 
      name: "Marcus Johnson", 
      avatar: "👨‍🔬", 
      points: 3654, 
      level: 13, 
      streak: 28, 
      badge: "🥉",
      specialty: "React Expert"
    },
    { 
      id: 4, 
      name: "Emma Davis", 
      avatar: "👩‍💼", 
      points: 3420, 
      level: 12, 
      streak: 24, 
      badge: "⭐",
      specialty: "Full Stack"
    },
    { 
      id: 5, 
      name: "David Kim", 
      avatar: "👨‍🎓", 
      points: 3187, 
      level: 11, 
      streak: 19, 
      badge: "🚀",
      specialty: "Node.js Pro"
    },
    { 
      id: 12, 
      name: "Fellycia Alvira", 
      avatar: "👩‍💻", 
      points: 2847, 
      level: 9, 
      streak: 7, 
      badge: "💎",
      specialty: "Rising Star"
    }
  ];

  // User achievements
  const achievements = [
    { 
      id: 1, 
      title: "First Steps", 
      description: "Complete your first lesson", 
      icon: "🎯", 
      completed: true, 
      date: "2024-01-10",
      rarity: "common"
    },
    { 
      id: 2, 
      title: "Week Warrior", 
      description: "Maintain a 7-day streak", 
      icon: "🔥", 
      completed: true, 
      date: "2024-01-15",
      rarity: "uncommon"
    },
    { 
      id: 3, 
      title: "Quiz Master", 
      description: "Score 100% on 5 quizzes", 
      icon: "🧠", 
      completed: true, 
      date: "2024-01-12",
      rarity: "rare"
    },
    { 
      id: 4, 
      title: "Speed Reader", 
      description: "Complete 10 reading materials", 
      icon: "⚡", 
      completed: true, 
      date: "2024-01-18",
      rarity: "uncommon"
    },
    { 
      id: 5, 
      title: "Night Owl", 
      description: "Study after 10 PM for 5 days", 
      icon: "🦉", 
      completed: false, 
      progress: 60,
      rarity: "rare"
    },
    { 
      id: 6, 
      title: "Perfectionist", 
      description: "Get 100% on 10 consecutive quizzes", 
      icon: "💯", 
      completed: false, 
      progress: 30,
      rarity: "legendary"
    }
  ];

  // Weekly challenges
  const weeklyChallenge = {
    title: "HTML Mastery Week",
    description: "Complete 5 HTML-related lessons this week",
    progress: 3,
    total: 5,
    reward: "🏅 HTML Expert Badge + 500 XP",
    timeLeft: "3 days left"
  };

  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'common': return 'from-gray-400 to-gray-500';
      case 'uncommon': return 'from-green-400 to-green-500';
      case 'rare': return 'from-blue-400 to-blue-500';
      case 'epic': return 'from-purple-400 to-purple-500';
      case 'legendary': return 'from-yellow-400 to-yellow-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const handleBack = () => {
    if (onNavigate) {
      onNavigate('dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      <div className="pb-24">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-orange-400 via-orange-500 to-purple-500 px-6 py-8 pb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Ranking & Achievements</h1>
              <p className="text-orange-100 text-sm mt-1">Compete, achieve, and level up!</p>
            </div>
          </div>

          {/* User Stats Cards */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{userPoints}</div>
              <div className="text-orange-100 text-xs">Total XP</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-white">#{userRank}</div>
              <div className="text-orange-100 text-xs">Global Rank</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-white">7</div>
              <div className="text-orange-100 text-xs">Day Streak</div>
            </div>
          </div>

          {/* Curved Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-white" style={{
            borderRadius: '50% 50% 0 0 / 100% 100% 0 0'
          }}></div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-4">
          <div className="flex bg-gray-100 rounded-2xl p-1">
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === 'leaderboard'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              🏆 Leaderboard
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === 'achievements'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              🏅 Achievements
            </button>
            <button
              onClick={() => setActiveTab('challenges')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === 'challenges'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              ⚡ Challenges
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6">
          {activeTab === 'leaderboard' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Global Leaderboard</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>2,847 learners</span>
                </div>
              </div>

              {leaderboardData.map((user, index) => (
                <div
                  key={user.id}
                  className={`relative overflow-hidden rounded-2xl p-4 transition-all duration-200 ${
                    user.name === "Fellycia Alvira"
                      ? 'bg-gradient-to-r from-orange-100 to-purple-100 border-2 border-orange-300 shadow-lg'
                      : index < 3
                      ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  {/* Rank Badge */}
                  <div className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? 'bg-yellow-400 text-yellow-900' :
                    index === 1 ? 'bg-gray-300 text-gray-800' :
                    index === 2 ? 'bg-orange-400 text-orange-900' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>

                  {/* Special Effects for Top 3 */}
                  {index < 3 && (
                    <div className="absolute top-0 right-0 text-2xl animate-pulse">
                      {index === 0 ? '👑' : index === 1 ? '🥈' : '🥉'}
                    </div>
                  )}

                  <div className="flex items-center space-x-4 ml-12">
                    <div className="text-3xl">{user.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-gray-900">{user.name}</h3>
                        <span className="text-lg">{user.badge}</span>
                      </div>
                      <p className="text-sm text-gray-600">{user.specialty}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium text-gray-700">{user.points.toLocaleString()} XP</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Flame className="w-4 h-4 text-orange-500" />
                          <span className="text-sm text-gray-600">{user.streak} days</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Trophy className="w-4 h-4 text-purple-500" />
                          <span className="text-sm text-gray-600">Lv.{user.level}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Your rank highlight */}
                  {user.name === "Fellycia Alvira" && (
                    <div className="absolute bottom-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      You!
                    </div>
                  )}
                </div>
              ))}

              {/* Show More Button */}
              <button className="w-full py-4 text-center text-orange-600 font-medium hover:bg-orange-50 rounded-xl transition-colors duration-200">
                View Full Leaderboard (2,847 learners)
              </button>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2">Your Achievements</h2>
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">4</div>
                    <div className="text-xs text-gray-600">Unlocked</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-400">2</div>
                    <div className="text-xs text-gray-600">In Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">67%</div>
                    <div className="text-xs text-gray-600">Completion</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`relative overflow-hidden rounded-2xl p-4 border transition-all duration-200 ${
                      achievement.completed
                        ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white shadow-lg`
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`text-4xl ${achievement.completed ? 'animate-bounce' : 'opacity-50'}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`font-bold ${achievement.completed ? 'text-white' : 'text-gray-900'}`}>
                            {achievement.title}
                          </h3>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            achievement.rarity === 'legendary' ? 'bg-yellow-200 text-yellow-800' :
                            achievement.rarity === 'epic' ? 'bg-purple-200 text-purple-800' :
                            achievement.rarity === 'rare' ? 'bg-blue-200 text-blue-800' :
                            achievement.rarity === 'uncommon' ? 'bg-green-200 text-green-800' :
                            'bg-gray-200 text-gray-800'
                          }`}>
                            {achievement.rarity}
                          </span>
                        </div>
                        <p className={`text-sm ${achievement.completed ? 'text-white opacity-90' : 'text-gray-600'}`}>
                          {achievement.description}
                        </p>
                        
                        {achievement.completed ? (
                          <div className="flex items-center space-x-2 mt-2">
                            <Award className="w-4 h-4 text-white" />
                            <span className="text-sm text-white opacity-90">
                              Completed on {achievement.date}
                            </span>
                          </div>
                        ) : achievement.progress && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-medium text-gray-900">{achievement.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${achievement.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Shine effect for completed achievements */}
                    {achievement.completed && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 -skew-x-12 animate-pulse"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'challenges' && (
            <div className="space-y-6">
              {/* Weekly Challenge */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 text-6xl opacity-20">⚡</div>
                <div className="relative">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm font-medium opacity-90">Weekly Challenge</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{weeklyChallenge.title}</h3>
                  <p className="text-purple-100 mb-4">{weeklyChallenge.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span className="font-bold">{weeklyChallenge.progress}/{weeklyChallenge.total}</span>
                    </div>
                    <div className="w-full bg-purple-400 bg-opacity-50 rounded-full h-3">
                      <div 
                        className="bg-white h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(weeklyChallenge.progress / weeklyChallenge.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm opacity-90">Reward</div>
                      <div className="font-medium">{weeklyChallenge.reward}</div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{weeklyChallenge.timeLeft}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Daily Challenges */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Today's Challenges</h3>
                <div className="space-y-3">
                  {[
                    { 
                      title: "Quiz Streak", 
                      description: "Complete 3 quizzes today", 
                      progress: 1, 
                      total: 3, 
                      reward: "100 XP",
                      icon: "🧠",
                      difficulty: "Easy"
                    },
                    { 
                      title: "Speed Reader", 
                      description: "Read 2 chapters in under 30 minutes", 
                      progress: 0, 
                      total: 2, 
                      reward: "150 XP + ⚡ Badge",
                      icon: "📚",
                      difficulty: "Medium"
                    },
                    { 
                      title: "Perfect Score", 
                      description: "Get 100% on any quiz", 
                      progress: 0, 
                      total: 1, 
                      reward: "200 XP + 💯 Badge",
                      icon: "🎯",
                      difficulty: "Hard"
                    }
                  ].map((challenge, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{challenge.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{challenge.title}</h4>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                              challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {challenge.difficulty}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-orange-600">{challenge.reward}</div>
                            <div className="text-sm text-gray-500">{challenge.progress}/{challenge.total}</div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div 
                              className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leaderboard Teaser */}
              <div className="bg-gradient-to-r from-orange-100 to-yellow-100 border border-orange-200 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">Climb the Ranks!</h4>
                    <p className="text-sm text-gray-600">Complete challenges to earn XP and climb the global leaderboard</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('leaderboard')}
                    className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition-colors duration-200"
                  >
                    View Rankings
                  </button>
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