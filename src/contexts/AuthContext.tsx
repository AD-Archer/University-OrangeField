'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for user data in cookies
        const userCookie = Cookies.get('user');
        if (!userCookie) {
          setIsLoading(false);
          return;
        }

        // Parse user data
        const userData = JSON.parse(userCookie);
        
        // Verify the session
        const response = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: userData.id }),
        });

        if (response.ok) {
          setUser(userData);
        } else {
          // Clear invalid session
          Cookies.remove('user');
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear potentially corrupted data
        Cookies.remove('user');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleSetUser = (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      // Store user data in cookie
      Cookies.set('user', JSON.stringify(newUser), { expires: 7 }); // 7 days
    } else {
      // Clear cookie on logout/null user
      Cookies.remove('user');
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: user?.id }),
      });
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      handleSetUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser: handleSetUser, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 