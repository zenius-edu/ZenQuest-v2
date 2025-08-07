import React, { useState } from 'react';
import { User, Settings, Bell, Moon, Globe, Shield, HelpCircle, LogOut, Edit3, Camera, Star, Award, Calendar, BookOpen } from 'lucide-react';

const ProfilePage = ({ onNavigate }) => {
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('English');

  // User data
  const userData = {
    name: "Fellycia Alvira",
    email: "fellycia.alvira@gmail.com",
    initials: "FA",
    joinDate: "January 2024",
    level: 9,
    xp: 2847,
    streak: 7,
    completedCourses: 12,
    achievements: 4
  };

  const handleLogout = () => {
    if (onNavigate) {
      onNavigate('login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pb-32">
        
        {/* Header with Theme Gradient */}
        <div className="px-6 py-8" style={{background: 'linear-gradient(135deg, #e76366 0%, #372974 100%)'}}>
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                <User className="w-10 h-10 text-gray-500" />
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

        {/* Logout Button with Theme */}
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