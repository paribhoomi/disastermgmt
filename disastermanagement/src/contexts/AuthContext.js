import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user email (minimal data)
    const storedEmail = localStorage.getItem('resq_user_email');
    if (storedEmail) {
      setUser({ email: storedEmail });
    }
    setLoading(false);
  }, []);

  // ✅ Login - store only email
  const login = (email) => {
    setUser({ email });
    localStorage.setItem('resq_user_email', email);
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('resq_user_email');
  };

  // ✅ Register - automatically log in after successful registration
  const register = (email) => {
    login(email);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};