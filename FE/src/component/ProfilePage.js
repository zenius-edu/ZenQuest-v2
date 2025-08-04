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

        {/* Profile Actions */}
        <div className="px-6 mb-6 pt-6">
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
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
          <h2 className="text-lg font-medium text-gray-900 mb-4">Settings</h2>
          
          <div className="space-y-3">
            {/* Notifications */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
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
                    notifications ? 'bg-gray-200' : 'bg-gray-200'
                  }`}
                  style={notifications ? {backgroundColor: '#372974'} : {}}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Language */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
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
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
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
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
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