// Backend API Configuration
import { safeError, safeAsyncCall } from './errorHandler';

// Prefer env var; fallback ke localhost. 
// Catatan: untuk Vite: import.meta.env.VITE_API_BASE_URL
const API_BASE_URL =
  (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_BASE_URL) ||
  (typeof import !== 'undefined' && typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL) ||
  'http://localhost:8000/api/v1';

// Helper: parse JSON aman (handle empty body)
const parseJsonSafe = async (res) => {
  try { return await res.json(); } catch { return null; }
};

// Helper: fetch dengan timeout + error mapping
const doFetch = async (url, options = {}, context = 'API call', timeoutMs = 15000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      signal: controller.signal,
    });

    const data = await parseJsonSafe(response);

    if (!response.ok) {
      const message = data?.message || response.statusText || 'Unknown error';
      // Lempar error yang informatif, tapi aman
      throw new Error(`${context} failed: ${response.status} - ${message}`);
    }
    return data;
  } catch (err) {
    // AbortError → timeout
    if (err?.name === 'AbortError') {
      throw handleApiError(new Error(`${context} timed out after ${timeoutMs}ms`), context);
    }
    throw handleApiError(err, context);
  } finally {
    clearTimeout(id);
  }
};

// Helper error -> pakai safeError
const handleApiError = (error, context) => {
  const safeErr = safeError(error, context);
  return new Error(safeErr.message);
};

// API utility functions
export const api = {
  // Google Login endpoint
  googleLogin: async (accessToken, userInfo) => {
    return safeAsyncCall(async () => {
      if (process?.env?.NODE_ENV !== 'production') {
        try { console.log('[API] POST', `${API_BASE_URL}/login/google`, { email: userInfo?.email }); } catch (_) {}
      }

      return await doFetch(`${API_BASE_URL}/login/google`, {
        method: 'POST',
        body: JSON.stringify({
          data: {
            'access-token': accessToken,
            email: userInfo?.email,
            name: userInfo?.name,
          }
        }),
      }, 'Google Login API');
    }, null, 'Google Login API').catch(error => {
      throw handleApiError(error, 'Google login API');
    });
  },

  // Email Login endpoint
  emailLogin: async (email, password) => {
    return safeAsyncCall(async () => {
      return await doFetch(`${API_BASE_URL}/login/email`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }, 'Email Login API');
    }, null, 'Email Login API').catch(error => {
      throw handleApiError(error, 'Email login API');
    });
  },

  // Get user profile
  getUserProfile: async (userId, accessToken) => {
    return safeAsyncCall(async () => {
      return await doFetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${accessToken}` },
      }, 'Get user profile');
    }, null, 'Get user profile').catch(error => {
      throw handleApiError(error, 'Get user profile');
    });
  },

  // Update user data
  updateUser: async (userId, userData, accessToken) => {
    return safeAsyncCall(async () => {
      return await doFetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${accessToken}` },
        body: JSON.stringify(userData),
      }, 'Update user');
    }, null, 'Update user').catch(error => {
      throw handleApiError(error, 'Update user');
    });
  }
};
