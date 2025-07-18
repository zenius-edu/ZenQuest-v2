import React, { useState } from 'react';
import { Mail, Eye, EyeOff, ArrowRight, BookOpen, Star, Users, Trophy } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-400 to-purple-500 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        
        {/* Logo & Welcome */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to ZenVerse</h1>
          <p className="text-orange-100">Your journey to mastery begins here</p>
        </div>

        {/* Stats Preview */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-3 text-center">
            <Users className="w-5 h-5 text-white mx-auto mb-1" />
            <div className="text-sm font-bold text-white">2.8K+</div>
            <div className="text-xs text-orange-100">Learners</div>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-3 text-center">
            <Star className="w-5 h-5 text-white mx-auto mb-1" />
            <div className="text-sm font-bold text-white">50+</div>
            <div className="text-xs text-orange-100">Courses</div>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-3 text-center">
            <Trophy className="w-5 h-5 text-white mx-auto mb-1" />
            <div className="text-sm font-bold text-white">95%</div>
            <div className="text-xs text-orange-100">Success</div>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Sign in to continue</h2>
          
          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 mb-4 hover:border-gray-300 hover:shadow-sm transition-all duration-200 disabled:opacity-50"
          >
            <div className="flex items-center justify-center space-x-3">
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              <span className="font-medium text-gray-700">
                {isLoading ? 'Signing in...' : 'Continue with Google'}
              </span>
            </div>
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-3 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-orange-600 hover:text-orange-700">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <span className="text-gray-600">Don't have an account? </span>
            <button className="text-orange-600 hover:text-orange-700 font-medium">
              Sign up
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-orange-100 text-sm">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 