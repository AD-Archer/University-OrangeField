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
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing user in cookies on mount
    const userCookie = Cookies.get('user');
    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie);
        // Verify the user session is still valid
        fetch('/api/auth/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: userData.id }),
        })
        .then(res => {
          if (res.ok) {
            setUser(userData);
          } else {
            // If verification fails, clear the cookie
            Cookies.remove('user');
            setUser(null);
          }
        })
        .catch(() => {
          Cookies.remove('user');
          setUser(null);
        });
      } catch (e) {
        console.error('Error parsing user cookie:', e);
        Cookies.remove('user');
      }
    }
  }, []);

  const handleSetUser = (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      Cookies.set('user', JSON.stringify(newUser), { expires: 7 }); // 7 days
    } else {
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
    <AuthContext.Provider value={{ user, setUser: handleSetUser, logout }}>
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