import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('admin_user');
    const storedToken = localStorage.getItem('admin_token');
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('admin_user');
        localStorage.removeItem('admin_token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await authService.adminLogin(email, password);
    const { token, data: { user: userData } } = data;
    localStorage.setItem('admin_token', token);
    localStorage.setItem('admin_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      // Ignore logout API errors — clear session anyway
    }
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_token');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
