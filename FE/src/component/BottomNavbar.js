import React from 'react';
import { Home, Edit, Trophy, User } from 'lucide-react';

const BottomNavbar = ({ currentPage, onNavigate }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 safe-area-inset-bottom">
      <div className="px-6 py-4 pb-safe">
        <div className="max-w-sm mx-auto">
          <div className="flex items-center justify-around">
            <button 
              onClick={() => onNavigate && onNavigate('dashboard')}
              className={`p-3 rounded-[20px] transition-all duration-200 active:scale-95 ${
                currentPage === 'dashboard' 
                  ? 'bg-gray-900' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <Home className={`w-6 h-6 ${
                currentPage === 'dashboard' ? 'text-white' : 'text-gray-400'
              }`} />
            </button>
            <button 
              onClick={() => onNavigate && onNavigate('learning-journey')}
              className={`p-3 rounded-[20px] transition-all duration-200 active:scale-95 ${
                currentPage === 'learning-journey' 
                  ? 'bg-gray-900' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <Edit className={`w-6 h-6 ${
                currentPage === 'learning-journey' ? 'text-white' : 'text-gray-400'
              }`} />
            </button>
            <button 
              onClick={() => onNavigate && onNavigate('ranking')}
              className={`p-3 rounded-[20px] transition-all duration-200 active:scale-95 ${
                currentPage === 'ranking' 
                  ? 'bg-gray-900' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <Trophy className={`w-6 h-6 ${
                currentPage === 'ranking' ? 'text-white' : 'text-gray-400'
              }`} />
            </button>
            <button className="p-3 hover:bg-gray-100 rounded-[20px] transition-all duration-200 active:scale-95">
              <User className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar; 