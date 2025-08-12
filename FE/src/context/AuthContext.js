import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

// Shape of user profile we care about
// { id, name, email, picture }

const AuthContext = createContext({
  user: null,
  setUser: () => {},
  clearUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);

  // Hydrate from localStorage on first load
  useEffect(() => {
    try {
      const stored = localStorage.getItem('zq_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.email) {
          setUserState(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to read user from storage:', e);
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

  const setUser = (nextUser) => {
    setUserState(nextUser);
  };

  const clearUser = () => {
    setUserState(null);
  };

  const value = useMemo(() => ({ user, setUser, clearUser }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext); 