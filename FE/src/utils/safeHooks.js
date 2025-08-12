import { useState, useEffect, useCallback } from 'react';
import { safeError } from './errorHandler';

// Safe useState wrapper - hooks called at top level
export const useSafeState = (initialState) => {
  const [state, setState] = useState(initialState);
  
  const safeSetState = useCallback((newState) => {
    try {
      if (typeof newState === 'function') {
        setState(prevState => {
          try {
            return newState(prevState);
          } catch (error) {
            const safeErr = safeError(error, 'useState callback');
            console.error('Error in useState callback:', safeErr.message);
            return prevState;
          }
        });
      } else {
        setState(newState);
      }
    } catch (error) {
      const safeErr = safeError(error, 'useState setter');
      console.error('Error setting state:', safeErr.message);
    }
  }, []);
  
  return [state, safeSetState];
};

// Safe useEffect wrapper - simplified
export const useSafeEffect = (effect, deps) => {
  useEffect(() => {
    try {
      const cleanup = effect();
      
      return () => {
        try {
          if (cleanup && typeof cleanup === 'function') {
            cleanup();
          }
        } catch (error) {
          const safeErr = safeError(error, 'useEffect cleanup');
          console.error('Error in useEffect cleanup:', safeErr.message);
        }
      };
    } catch (error) {
      const safeErr = safeError(error, 'useEffect');
      console.error('Error in useEffect:', safeErr.message);
      return undefined;
    }
  }, deps);
};

// Safe async operation hook - simplified
export const useSafeAsync = (asyncFn, deps = []) => {
  const [state, setState] = useSafeState({
    data: null,
    loading: true,
    error: null
  });
  
  useSafeEffect(() => {
    let isMounted = true;
    
    const runAsync = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const result = await asyncFn();
        
        if (isMounted) {
          setState(prev => ({ ...prev, data: result, loading: false }));
        }
      } catch (error) {
        const safeErr = safeError(error, 'useSafeAsync');
        
        if (isMounted) {
          setState(prev => ({ 
            ...prev, 
            error: safeErr.message, 
            loading: false 
          }));
        }
      }
    };
    
    runAsync();
    
    return () => {
      isMounted = false;
    };
  }, deps);
  
  return state;
};

// Safe API call hook
export const useSafeApi = (apiCall, deps = []) => {
  return useSafeAsync(apiCall, deps);
}; 