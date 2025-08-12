import React from 'react';
import { User, LogOut, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = ({ onNavigate }) => {
  const { user, clearUser } = useAuth();

  const userData = {
    name: user?.name || 'Fellycia Alvira',
    email: user?.email || 'fellycia@example.com',
    imageUrl: (typeof user?.picture === 'string' && /^https?:\/\//.test(user.picture)) ? user.picture : null,
    joinDate: 'January 2024',
    level: 9,
    xp: 2847,
    streak: 7,
    completedCourses: 12,
    achievements: 4
  };

  const handleLogout = () => {
    clearUser();
    if (onNavigate) onNavigate('login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pb-32">
        
        {/* Header with Theme Gradient */}
        <div className="px-6 py-8" style={{background: 'linear-gradient(135deg, #e76366 0%, #372974 100%)'}}>
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {userData.imageUrl ? (
                  <img 
                    src={userData.imageUrl} 
                    alt={userData.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.src = '/images/zenquest 2.png'; }}
                  />
                ) : (
                  <User className="w-10 h-10 text-gray-500" />
                )}
              </div>
              <button className="absolute bottom-0 right-0 w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Camera className="w-3 h-3 text-white" />
              </button>
            </div>
            <h1 className="text-xl font-medium text-white">{userData.name}</h1>
            <p className="text-white text-opacity-80 text-sm">{userData.email}</p>
            <p className="text-white text-opacity-60 text-xs mt-1">Member since {userData.joinDate}</p>
          </div>
        </div>

        {/* User Stats Cards */}
        <div className="px-6 -mt-8 mb-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{userData.level}</div>
                <div className="text-xs text-gray-500">Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">{userData.streak}</div>
                <div className="text-xs text-gray-500">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{userData.completedCourses}</div>
                <div className="text-xs text-gray-500">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{userData.achievements}</div>
                <div className="text-xs text-gray-500">Achievements</div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="px-6 mb-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">Account Active</div>
                <div className="text-sm text-gray-600">Connected to ZenQuest</div>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="px-6 mt-8">
          <button
            onClick={handleLogout}
            className="w-full bg-red-50 border border-red-200 rounded-2xl px-4 py-4 hover:bg-red-100 transition-colors duration-200"
          >
            <div className="flex items-center justify-center space-x-3">
              <LogOut className="w-5 h-5 text-red-600" />
              <span className="font-medium text-red-600">Sign Out</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 