// Backend API Configuration
import { safeError, safeAsyncCall } from './errorHandler';

// Prefer env var; fallback ke localhost. (CRA replaces this at build time)
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/v1';

// Determine environment via CRA
const isDevelopment = process.env.NODE_ENV !== 'production';

// Module-level bearer token used for all requests
let authToken = null;
export const setApiAuthToken = (token) => {
  authToken = token || null;
};

// Helper: parse JSON aman (handle empty body)
const parseJsonSafe = async (res) => {
  try { return await res.json(); } catch { return null; }
};

// Helper: fetch dengan timeout + error mapping
const doFetch = async (url, options = {}, context = 'API call', timeoutMs = 15000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  // Attach Authorization header if token exists and header not already set
  const mergedHeaders = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  if (authToken && !mergedHeaders.Authorization) {
    mergedHeaders.Authorization = `Bearer ${authToken}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: mergedHeaders,
      signal: controller.signal,
    });

    const data = await parseJsonSafe(response);

    if (!response.ok) {
      const message = data?.message || response.statusText || 'Unknown error';
      throw new Error(`${context} failed: ${response.status} - ${message}`);
    }
    return data;
  } catch (err) {
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
      if (isDevelopment) {
        try { console.log('[API] POST', `${API_BASE_URL}/login/google`, { email: userInfo?.email }); } catch (_) {}
      }

      return await doFetch(`${API_BASE_URL}/login/google`, {
        method: 'POST',
        body: JSON.stringify({
          token: accessToken
        }),
      }, 'Google Login API');
    }, null, 'Google Login API').catch(error => {
      throw handleApiError(error, 'Google login API');
    });
  },

  // Get current user (me)
  getCurrentUser: async () => {
    return safeAsyncCall(async () => {
      return await doFetch(`${API_BASE_URL}/login/me`, { method: 'GET' }, 'Get current user');
    }, null, 'Get current user').catch(error => {
      throw handleApiError(error, 'Get current user');
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

  // Get user profile by id
  getUserProfile: async (userId) => {
    return safeAsyncCall(async () => {
      return await doFetch(`${API_BASE_URL}/users/${userId}`, { method: 'GET' }, 'Get user profile');
    }, null, 'Get user profile').catch(error => {
      throw handleApiError(error, 'Get user profile');
    });
  },

  // Update user data
  updateUser: async (userId, userData) => {
    return safeAsyncCall(async () => {
      return await doFetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
      }, 'Update user');
    }, null, 'Update user').catch(error => {
      throw handleApiError(error, 'Update user');
    });
  }
};
