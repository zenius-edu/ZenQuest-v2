import React, { useState } from 'react';
import { User, Settings, Bell, Moon, Globe, Shield, HelpCircle, LogOut, Edit3, Camera, Star, Award, Calendar, BookOpen } from 'lucide-react';

const ProfilePage = ({ onNavigate }) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');

  // User data
  const userData = {
    name: "Fellycia Alvira",
    email: "fellycia.alvira@gmail.com",
    avatar: "👩‍💻",
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
      <div className="pb-24">
        
        {/* Header */}
        <div className="bg-white px-6 py-8 shadow-sm">
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-3xl">
                {userData.avatar}
              </div>
              <button className="absolute bottom-0 right-0 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                <Camera className="w-3 h-3 text-white" />
              </button>
            </div>
            <h1 className="text-xl font-bold text-gray-900">{userData.name}</h1>
            <p className="text-gray-600 text-sm">{userData.email}</p>
            <p className="text-gray-500 text-xs mt-1">Member since {userData.joinDate}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="px-6 py-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">{userData.xp}</div>
                  <div className="text-xs text-gray-600">XP Points</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">Lv.{userData.level}</div>
                  <div className="text-xs text-gray-600">Current Level</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">{userData.streak}</div>
                  <div className="text-xs text-gray-600">Day Streak</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">{userData.completedCourses}</div>
                  <div className="text-xs text-gray-600">Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Actions */}
        <div className="px-6 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <Edit3 className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Edit Profile</span>
              </div>
              <div className="text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Settings Section */}
        <div className="px-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Settings</h2>
          
          <div className="space-y-4">
            {/* Notifications */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-4">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="font-medium text-gray-900">Notifications</div>
                    <div className="text-sm text-gray-600">Push notifications and emails</div>
                  </div>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                    notifications ? 'bg-orange-500' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Dark Mode */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-4">
                <div className="flex items-center space-x-3">
                  <Moon className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="font-medium text-gray-900">Dark Mode</div>
                    <div className="text-sm text-gray-600">Switch to dark theme</div>
                  </div>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                    darkMode ? 'bg-orange-500' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Language */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-gray-600" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Language</div>
                    <div className="text-sm text-gray-600">{language}</div>
                  </div>
                </div>
                <div className="text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Privacy */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Privacy & Security</div>
                    <div className="text-sm text-gray-600">Manage your privacy settings</div>
                  </div>
                </div>
                <div className="text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Help */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <HelpCircle className="w-5 h-5 text-gray-600" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Help & Support</div>
                    <div className="text-sm text-gray-600">Get help and contact support</div>
                  </div>
                </div>
                <div className="text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="px-6 mt-8">
          <button
            onClick={handleLogout}
            className="w-full bg-red-50 border border-red-200 rounded-xl px-4 py-4 hover:bg-red-100 transition-colors duration-200"
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