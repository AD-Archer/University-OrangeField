'use client';

import { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: {
    name: string;
    email: string;
  } | null;
  setUser: (user: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextType['user']>(null);

  const handleSetUser = (userData: any) => {
    const userInfo = {
      name: userData.name,
      email: userData.email,
    };
    
    localStorage.setItem('currentUser', JSON.stringify(userInfo));
    setUser(userInfo);
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser: handleSetUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 