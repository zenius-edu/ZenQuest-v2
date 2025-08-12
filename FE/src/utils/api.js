// Backend API Configuration
import { safeError, safeAsyncCall } from './errorHandler';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/v1';

// Helper function for better error handling
const handleApiError = (error, context) => {
  const safeErr = safeError(error, context);
  return new Error(safeErr.message);
};

// API utility functions
export const api = {
  // Google Login endpoint
  googleLogin: async (accessToken, userInfo) => {
    return safeAsyncCall(async () => {
      try { console.log('[API] POST', `${API_BASE_URL}/login/google`, { email: userInfo?.email }); } catch (_) {}
      const response = await fetch(`${API_BASE_URL}/login/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            'access-token': accessToken,
            email: userInfo?.email,
            name: userInfo?.name,
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(`Backend error: ${response.status} - ${errorData.message || response.statusText}`);
      }

      return await response.json();
    }, null, 'Google Login API').catch(error => {
      throw handleApiError(error, 'Google login API');
    });
  },

  // Email Login endpoint
  emailLogin: async (email, password) => {
    return safeAsyncCall(async () => {
      const response = await fetch(`${API_BASE_URL}/login/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(`Login failed: ${response.status} - ${errorData.message || response.statusText}`);
      }

      return await response.json();
    }, null, 'Email Login API').catch(error => {
      throw handleApiError(error, 'Email login API');
    });
  },

  // Future API endpoints can be added here
  getUserProfile: async (userId, accessToken) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user profile: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Get user profile error:', error);
      throw error;
    }
  },

  // Update user data
  updateUser: async (userId, userData, accessToken) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update user: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  }
}; 