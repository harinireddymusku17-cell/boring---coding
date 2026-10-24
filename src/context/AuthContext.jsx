import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_DEMO_USER = {
  id: 'demo-student-id',
  _id: 'demo-student-id',
  name: 'Alex Coder',
  email: 'demo@boringcoding.dev',
  avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Alex',
  xp: 1850,
  level: 4,
  streak: 5,
  bio: 'Full stack enthusiast learning algorithms and building side projects without boredom!',
  preferredTheme: 'minimal',
  preferredLanguage: 'javascript',
  completedLessons: ['py-les-1', 'js-les-1'],
  unlockedAchievements: ['first_byte', 'streak_flame_3'],
  isDemo: true,
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('boring_coding_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        return DEFAULT_DEMO_USER;
      }
    }
    return DEFAULT_DEMO_USER; // Default to demo user for frictionless instant showcase
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('boring_coding_token') || 'demo-student-token';
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('boring_coding_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('boring_coding_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('boring_coding_token', token);
    } else {
      localStorage.removeItem('boring_coding_token');
    }
  }, [token]);

  const loginDemo = () => {
    setUser(DEFAULT_DEMO_USER);
    setToken('demo-student-token');
    return { success: true, user: DEFAULT_DEMO_USER };
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success && data.token) {
        setUser(data.user);
        setToken(data.token);
        return { success: true, user: data.user };
      } else {
        // Fallback for demo testing
        if (email.toLowerCase().includes('demo') || password === 'password123') {
          return loginDemo();
        }
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch {
      // If backend server is not running, provide intelligent demo fallback
      if (email.toLowerCase().includes('demo') || password === 'password123') {
        return loginDemo();
      }
      return { success: false, message: 'Could not connect to backend server. Try Demo Student Login!' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (data.success && data.token) {
        setUser(data.user);
        setToken(data.token);
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message || 'Registration failed' };
      }
    } catch {
      // Local demo student registration fallback
      const newUser = {
        id: 'user-' + Date.now(),
        name,
        email,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
        xp: 150,
        level: 1,
        streak: 1,
        bio: 'New coding hero on the journey!',
        preferredTheme: 'minimal',
        preferredLanguage: 'javascript',
        completedLessons: [],
        unlockedAchievements: ['first_byte'],
        isDemo: true,
      };
      setUser(newUser);
      setToken('guest-token-' + Date.now());
      return { success: true, user: newUser, fallback: true };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('boring_coding_user');
    localStorage.removeItem('boring_coding_token');
  };

  const updateUser = (fields) => {
    setUser(prev => {
      const updated = { ...prev, ...fields };
      localStorage.setItem('boring_coding_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(user && token),
        loading,
        login,
        register,
        loginDemo,
        logout,
        updateUser,
      }}
    >
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
