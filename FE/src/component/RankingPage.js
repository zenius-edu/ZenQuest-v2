import React, { useState } from 'react';
import { Trophy, Star, Flame, Medal, Award, Crown, TrendingUp, Target, User, ArrowLeft } from 'lucide-react';

const RankingPage = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('leaderboard');

  // Simplified leaderboard data - removed emoji avatars
  const leaderboardData = [
    { id: 1, name: "Albert Flores", initials: "AF", points: 2905, level: 15, streak: 45, avatar: "/api/placeholder/80/80" },
    { id: 2, name: "Bessie Cooper", initials: "BC", points: 1967, level: 14, streak: 32, avatar: "/api/placeholder/80/80" },
    { id: 3, name: "Devon Lane", initials: "DL", points: 1892, level: 13, streak: 28, avatar: "/api/placeholder/80/80" },
    { id: 4, name: "Esther Howard", initials: "EH", points: 1087, level: 12, streak: 24, avatar: "/api/placeholder/80/80" },
    { id: 5, name: "Leslie Alexander", initials: "LA", points: 1055, level: 11, streak: 19, avatar: "/api/placeholder/80/80" },
    { id: 6, name: "Kristin Watson", initials: "KW", points: 1002, level: 9, streak: 7, avatar: "/api/placeholder/80/80" },
    { id: 7, name: "Albert Flores", initials: "AF", points: 917, level: 8, streak: 12, avatar: "/api/placeholder/80/80" }
  ];

  // Current user data (Warren)
  const currentUser = {
    name: "Warren",
    initials: "W",
    points: 238,
    level: "Silver",
    position: 258,
    avatar: "/api/placeholder/80/80"
  };

  // Top 3 for podium
  const topThree = leaderboardData.slice(0, 3);
  const remainingUsers = leaderboardData.slice(3);

  return (
    <div className="min-h-screen" style={{backgroundColor: '#3d2c73'}}>
      <div className="pb-32">
        
        {/* Header */}
        <div className="px-6 py-8 pb-4" style={{backgroundColor: '#3d2c73'}}>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
          </div>
          </div>

        {/* Podium Section */}
        <div className="px-6 py-4 pb-2" style={{backgroundColor: '#3d2c73'}}>
          <div className="relative flex items-end justify-center space-x-4 mb-4">
            {/* 2nd Place - Left */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-2 ring-2 ring-gray-300">
                <img 
                  src={topThree[1]?.avatar} 
                  alt={topThree[1]?.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold" style={{display: 'none'}}>
                  {topThree[1]?.initials}
                </div>
              </div>
              <h3 className="font-medium text-white text-sm text-center">{topThree[1]?.name}</h3>
              <p className="text-xs text-gray-300">{topThree[1]?.points} points</p>
              <div className="w-20 h-32 rounded-lg mt-4 flex items-center justify-center" style={{backgroundColor: '#a18ed8'}}>
                <span className="text-4xl font-bold text-white">2</span>
              </div>
            </div>
            
            {/* 1st Place - Center (Highest) */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-2 ring-4 ring-yellow-400">
                <img 
                  src={topThree[0]?.avatar} 
                  alt={topThree[0]?.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold" style={{display: 'none'}}>
                  {topThree[0]?.initials}
                </div>
              </div>
              <h3 className="font-semibold text-white text-center">{topThree[0]?.name}</h3>
              <p className="text-sm text-gray-300">{topThree[0]?.points} points</p>
              <div className="w-20 h-40 rounded-lg mt-4 flex items-center justify-center relative" style={{backgroundColor: '#a18ed8'}}>
                <span className="text-5xl font-bold text-white">1</span>
                <div className="absolute -top-3 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Crown className="w-5 h-5 text-yellow-700" />
                </div>
              </div>
            </div>

            {/* 3rd Place - Right */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-2 ring-2 ring-orange-300">
                <img 
                  src={topThree[2]?.avatar} 
                  alt={topThree[2]?.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold" style={{display: 'none'}}>
                  {topThree[2]?.initials}
                </div>
              </div>
              <h3 className="font-medium text-white text-sm text-center">{topThree[2]?.name}</h3>
              <p className="text-xs text-gray-300">{topThree[2]?.points} points</p>
              <div className="w-20 h-24 rounded-lg mt-4 flex items-center justify-center" style={{backgroundColor: '#a18ed8'}}>
                <span className="text-3xl font-bold text-white">3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Current User Card */}
        <div className="px-6 py-1 pb-2" style={{backgroundColor: '#3d2c73'}}>
          <div className="rounded-2xl p-4" style={{background: 'linear-gradient(135deg, #e76366 0%, #372974 100%)'}}>
                  <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold" style={{display: 'none'}}>
                  {currentUser.initials}
                      </div>
                    </div>
                    <div className="flex-1">
                <h3 className="font-semibold text-white text-lg">{currentUser.name}</h3>
                <div className="flex items-center space-x-6 mt-1">
                  <div className="text-center">
                    <div className="text-white font-semibold">Points:</div>
                    <div className="text-white text-sm">{currentUser.points}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-semibold">Level:</div>
                    <div className="text-white text-sm">{currentUser.level}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-semibold">Position:</div>
                    <div className="text-white text-sm">{currentUser.position}</div>
                  </div>
                </div>
              </div>
                      </div>
                    </div>
              </div>

        {/* Remaining Rankings */}
        <div className="px-6 pt-2" style={{backgroundColor: '#3d2c73'}}>
          <div className="space-y-3">
            {remainingUsers.map((user, index) => (
              <div key={user.id} className="bg-white rounded-2xl p-4 border border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-600">0{index + 4}</span>
                  </div>
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold" style={{display: 'none'}}>
                      {user.initials}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.points} points</p>
                  </div>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: '#a18ed8'}}>
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default RankingPage; 