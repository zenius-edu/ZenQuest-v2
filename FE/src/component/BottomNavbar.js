import React from 'react';
import { Home, Trophy, User } from 'lucide-react';

const BottomNavbar = ({ currentPage, onNavigate }) => {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <div className="rounded-3xl px-6 py-4" style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: `
          0 32px 64px -12px rgba(0, 0, 0, 0.4),
          inset 0 1px 0 rgba(255, 255, 255, 0.4),
          inset 0 -1px 0 rgba(255, 255, 255, 0.1),
          0 0 0 1px rgba(0, 0, 0, 0.05)
`
      }}>
        <div className="max-w-sm mx-auto">
          <div className="flex items-center justify-around">
            <button 
              onClick={() => onNavigate && onNavigate('dashboard')}
              className={`p-3 rounded-2xl transition-all duration-300 active:scale-95 ${
                currentPage === 'dashboard' 
                  ? 'shadow-lg' 
                  : 'hover:bg-white/20'
              }`}
              style={{
                background: currentPage === 'dashboard' 
                  ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%)'
                  : 'transparent'
              }}
            >
              <Home 
                className="w-6 h-6 transition-all duration-300" 
                style={{
                  color: currentPage === 'dashboard' ? '#6b7280' : '#9ca3af',
                }}
              />
            </button>
            <button
              onClick={() => onNavigate && onNavigate('ranking')}
              className={`p-3 rounded-2xl transition-all duration-300 active:scale-95 ${
                currentPage === 'ranking' 
                  ? 'shadow-lg' 
                  : 'hover:bg-white/20'
              }`}
              style={{
                background: currentPage === 'ranking' 
                  ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%)'
                  : 'transparent'
              }}
            >
              <Trophy 
                className="w-6 h-6 transition-all duration-300" 
                style={{
                  color: currentPage === 'ranking' ? '#6b7280' : '#9ca3af',
                }}
              />
            </button>
            <button 
              onClick={() => onNavigate && onNavigate('profile')}
              className={`p-3 rounded-2xl transition-all duration-300 active:scale-95 ${
                currentPage === 'profile' 
                  ? 'shadow-lg' 
                  : 'hover:bg-white/20'
              }`}
              style={{
                background: currentPage === 'profile' 
                  ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%)'
                  : 'transparent'
              }}
            >
              <User 
                className="w-6 h-6 transition-all duration-300" 
                style={{
                  color: currentPage === 'profile' ? '#6b7280' : '#9ca3af',
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar; 