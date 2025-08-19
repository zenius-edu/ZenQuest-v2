import React from 'react';
import { Mail, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { api, setApiAuthToken, setApiRefreshToken } from '../utils/api';
import { useSafeState } from '../utils/safeHooks';
import { useAuth } from '../context/AuthContext';

const LoginPage = ({ onNavigate }) => {
  const { setUser, setToken } = useAuth();
  const [showPassword, setShowPassword] = useSafeState(false);
  const [email, setEmail] = useSafeState('');
  const [password, setPassword] = useSafeState('');
  const [isLoading, setIsLoading] = useSafeState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useSafeState(false);
  const [googleError, setGoogleError] = useSafeState(null);

  // Google OAuth Configuration (NEW Google Identity Services)
  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const processLogin = async (token, userInfo) => {
    try {
      setIsGoogleLoading(true);
      setGoogleError(null);

      if (!userInfo || !userInfo.email) {
        throw new Error("User information is incomplete.");
      }

      setUser(userInfo);
      console.log('Google Sign-In successful:', userInfo);
      
      try {
        const backendData = await api.googleLogin(token, userInfo);
        console.log('Backend login response:', backendData);
        // Expecting shape { token, refresh-token, user-data }
        if (backendData && backendData.token) {
          setToken(backendData.token);
          setApiAuthToken(backendData.token);
          if (backendData['refresh-token']) {
            setApiRefreshToken(backendData['refresh-token']);
            try { localStorage.setItem('zq_refresh_token', backendData['refresh-token']); } catch {}
          }
          if (backendData['user-data']) {
            setUser(backendData['user-data']);
          }
        }
      } catch (backendError) {
        console.error('Backend login error:', backendError);
      }
      
      if (onNavigate) {
        onNavigate('dashboard');
      }
      
    } catch (error) {
      console.error('Google login processing error:', error);
      setGoogleError(error.message || 'Failed to process Google sign-in');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    if (isGoogleLoading) return;
    
    setGoogleError(null);
    
    if (!CLIENT_ID) {
      console.error('Missing REACT_APP_GOOGLE_CLIENT_ID environment variable');
      setGoogleError('Missing Google Client ID configuration');
      return;
    }
    
    try {
      if (!window.google || !window.google.accounts) {
        throw new Error('Google Identity Services not loaded. Please refresh the page.');
      }

      console.log('Starting Google Sign-In with popup...');

      // Directly initialize the popup flow
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: 'openid email profile',
        prompt: '', // Can be empty or 'select_account' to always ask the user to choose
        callback: (tokenResponse) => {
          console.log('Token response (Popup):', tokenResponse);
          if (tokenResponse && tokenResponse.access_token) {
            setIsGoogleLoading(true);
            fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokenResponse.access_token}`)
              .then(res => res.json())
              .then(userInfo => {
                console.log('User info from API (Popup):', userInfo);
                processLogin(tokenResponse.access_token, userInfo);
              })
              .catch(err => {
                console.error('Error fetching user info (Popup):', err);
                setGoogleError('Failed to get user information from Google');
                setIsGoogleLoading(false);
              });
          } else {
            console.error("Popup flow did not return access_token", tokenResponse);
            setGoogleError("Google login failed: No token received.");
          }
        },
      });
      client.requestAccessToken();
      
    } catch (error) {
      console.error('Google login initialization error:', error);
      setGoogleError(error.message || 'Failed to initialize Google Sign-In');
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setGoogleError(null); // Clear any Google errors
    
    try {
      // Send email/password to backend using API utility
      const userData = await api.emailLogin(email, password);
      console.log('Email login successful:', userData);

      // Save to AuthContext if backend returns profile
      if (userData && (userData.name || userData.email)) {
        setUser({
          id: userData.id || userData.user_id || undefined,
          name: userData.name || email.split('@')[0],
          email: userData.email || email,
          picture: userData.picture || null,
        });
      }
      
      // Navigate to dashboard on successful login
      if (onNavigate) {
        onNavigate('dashboard');
      }
    } catch (error) {
      console.error('Email login error:', error);
      const errorMessage = error?.message || error?.toString() || 'Login failed';
      setGoogleError(errorMessage);
      
      // For demo purposes, still allow navigation if it's a connection error
      if (errorMessage.includes('fetch') || errorMessage.includes('NetworkError')) {
        console.log('Backend unavailable, using demo mode');
        setUser({ id: 'demo', name: email.split('@')[0], email, picture: null });
        if (onNavigate) {
          onNavigate('dashboard');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{background: '#372974'}}>
      <div className="w-full max-w-sm">
        
        {/* Even Bigger Logo */}
        <div className="text-center mb-0">
          <img 
            src="/images/zenquest 2.png" 
            alt="ZenQuest Logo" 
            className="w-64 h-64 object-contain mx-auto"
          />
        </div>

        {/* Compact Login Form */}
        <div className="bg-white rounded-2xl p-5 shadow-xl border border-gray-100 -mt-12">
          <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">Sign in to continue</h2>
          
          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-2.5 mb-3 hover:border-gray-300 hover:shadow-md transition-all duration-200 disabled:opacity-50"
          >
            <div className="flex items-center justify-center space-x-2">
              {isGoogleLoading ? (
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
                {isGoogleLoading ? 'Signing in...' : 'Continue with Google'}
              </span>
            </div>
          </button>

          {/* Google Error Display */}
          {googleError && (
            <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-xs text-center">{googleError}</p>
            </div>
          )}

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