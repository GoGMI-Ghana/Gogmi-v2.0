import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [membership, setMembership] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load saved session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('gogmi_user');
    const savedMembership = localStorage.getItem('gogmi_membership');
    
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        if (savedMembership) {
          setMembership(JSON.parse(savedMembership));
        }
      } catch {
        localStorage.removeItem('gogmi_user');
        localStorage.removeItem('gogmi_membership');
      }
    }
    setLoading(false);
  }, []);

  const login = async ({ membershipId }) => {
    try {
      const apiUrl = 'https://api.gogmi.org.gh/api';
      const response = await fetch(`${apiUrl}/auth/login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ membershipId })
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.data.user);
        setMembership(data.data.membership);
        localStorage.setItem('gogmi_user', JSON.stringify(data.data.user));
        localStorage.setItem('gogmi_membership', JSON.stringify(data.data.membership));
        return { success: true };
      } else {
        return { success: false, error: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Unable to connect to server. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    setMembership(null);
    localStorage.removeItem('gogmi_user');
    localStorage.removeItem('gogmi_membership');
  };

  const isAuthenticated = !!user;
  const isMember = !!membership && membership.status === 'active';

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, membership, isAuthenticated, isMember, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
