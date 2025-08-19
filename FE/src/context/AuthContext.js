import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { setApiAuthToken } from '../utils/api';

// Shape of user profile we care about
// { id, name, email, picture }

const AuthContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
  clearUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [token, setTokenState] = useState(null);

  // Hydrate from localStorage on first load
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('zq_user');
      const storedToken = localStorage.getItem('zq_token');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed && parsed.email) {
          setUserState(parsed);
        }
      }
      if (storedToken && typeof storedToken === 'string') {
        setTokenState(storedToken);
        setApiAuthToken(storedToken);
      }
    } catch (e) {
      console.error('Failed to read auth from storage:', e);
    }
  }, []);

  // Persist to localStorage when user changes
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('zq_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('zq_user');
      }
    } catch (e) {
      console.error('Failed to write user to storage:', e);
    }
  }, [user]);

  // Persist token and propagate to API module
  useEffect(() => {
    try {
      if (token) {
        localStorage.setItem('zq_token', token);
      } else {
        localStorage.removeItem('zq_token');
      }
    } catch (e) {
      console.error('Failed to write token to storage:', e);
    }
    setApiAuthToken(token);
  }, [token]);

  const setUser = (nextUser) => {
    setUserState(nextUser);
  };

  const setToken = (nextToken) => {
    setTokenState(nextToken || null);
  };

  const clearUser = () => {
    setUserState(null);
    setTokenState(null);
    try {
      localStorage.removeItem('zq_user');
      localStorage.removeItem('zq_token');
    } catch {}
    setApiAuthToken(null);
  };

  const value = useMemo(() => ({ user, token, setUser, setToken, clearUser }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext); 