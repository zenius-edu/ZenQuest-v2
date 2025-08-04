import React, { useState } from 'react';
import { Mail, Eye, EyeOff, ArrowRight, Star, Users, Trophy } from 'lucide-react';

const LoginPage = ({ onNavigate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    // Simulate Google login
    setTimeout(() => {
      setIsLoading(false);
      if (onNavigate) {
        onNavigate('dashboard');
      }
    }, 2000);
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate email login
    setTimeout(() => {
      setIsLoading(false);
      if (onNavigate) {
        onNavigate('dashboard');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{background: '#372974'}}>
      <div className="w-full max-w-sm">
        
        {/* Even Bigger Logo */}
        <div className="text-center mb-2">
          <img 
            src="/images/zenquest 2.png" 
            alt="ZenQuest Logo" 
            className="w-64 h-64 object-contain mx-auto"
          />
        </div>

        {/* Compact Login Form */}
        <div className="bg-white rounded-2xl p-5 shadow-xl border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">Sign in to continue</h2>
          
          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-2.5 mb-3 hover:border-gray-300 hover:shadow-md transition-all duration-200 disabled:opacity-50"
          >
            <div className="flex items-center justify-center space-x-2">
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" style={{borderColor: '#372974'}}></div>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              <span className="font-medium text-gray-700 text-sm">
                {isLoading ? 'Signing in...' : 'Continue with Google'}
              </span>
            </div>
          </button>

          {/* Divider */}
          <div className="flex items-center my-3">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-2 text-xs text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-sm"
                  style={{'--tw-ring-color': '#372974'}}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-9 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-sm"
                  style={{'--tw-ring-color': '#372974'}}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                <span className="ml-2 text-xs text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-xs font-medium hover:text-orange-500 transition-colors" style={{color: '#372974'}}>
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full text-white font-semibold py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              style={{
                background: isLoading || !email || !password ? '#9CA3AF' : '#372974'
              }}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-4">
            <span className="text-gray-600 text-xs">Don't have an account? </span>
            <button className="text-xs font-semibold hover:text-orange-500 transition-colors" style={{color: '#372974'}}>
              Sign up
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-4">
          <p className="text-white text-opacity-80 text-xs leading-relaxed">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 