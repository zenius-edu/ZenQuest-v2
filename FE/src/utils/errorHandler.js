// Comprehensive Error Handling Utility

export const safeStringify = (obj) => {
  if (obj === null || obj === undefined) return 'null';
  if (typeof obj === 'string') return obj;
  if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj);
  
  try {
    return JSON.stringify(obj, null, 2);
  } catch (error) {
    // Handle circular references or non-serializable objects
    try {
      return JSON.stringify(obj, (key, value) => {
        if (typeof value === 'object' && value !== null) {
          // Check for circular reference
          if (seen.has(value)) {
            return '[Circular Reference]';
          }
          seen.add(value);
        }
        return value;
      });
    } catch (fallbackError) {
      return `[Object: ${Object.prototype.toString.call(obj)}]`;
    }
  }
};

// Track circular references
const seen = new WeakSet();

export const safeError = (error, context = 'Unknown') => {
  let errorMessage = 'Unknown error';
  let errorDetails = {};

  try {
    if (error instanceof Error) {
      errorMessage = error.message || 'Error occurred';
      errorDetails = {
        name: error.name,
        message: error.message,
        stack: error.stack,
        context: context
      };
    } else if (typeof error === 'string') {
      errorMessage = error;
      errorDetails = { message: error, context: context };
    } else if (error && typeof error === 'object') {
      errorMessage = error.message || error.error || error.statusText || safeStringify(error);
      errorDetails = {
        ...error,
        context: context,
        stringified: safeStringify(error)
      };
    } else {
      errorMessage = String(error);
      errorDetails = { value: error, type: typeof error, context: context };
    }
  } catch (handlingError) {
    errorMessage = 'Error occurred while handling error';
    errorDetails = {
      originalError: safeStringify(error),
      handlingError: handlingError.message,
      context: context
    };
  }

  console.error(`[${context}] Error:`, errorDetails);
  return {
    message: errorMessage,
    details: errorDetails
  };
};

export const withErrorHandling = (fn, context = 'Function') => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      const safeErr = safeError(error, context);
      throw new Error(safeErr.message);
    }
  };
};

export const safeAsyncCall = async (asyncFn, fallback = null, context = 'Async Call') => {
  try {
    return await asyncFn();
  } catch (error) {
    const safeErr = safeError(error, context);
    console.warn(`${context} failed, using fallback:`, safeErr.message);
    return fallback;
  }
};

// React component error wrapper
export const withSafeRender = (Component, fallbackUI = null) => {
  return (props) => {
    try {
      return <Component {...props} />;
    } catch (error) {
      const safeErr = safeError(error, `Component: ${Component.name || 'Unknown'}`);
      console.error('Component render error:', safeErr);
      
      if (fallbackUI) {
        return fallbackUI;
      }
      
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">Component Error: {safeErr.message}</p>
        </div>
      );
    }
  };
}; 