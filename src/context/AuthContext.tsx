//
// FILE: src/context/AuthContext.tsx (WITH DEBUG LOGGING)
//

'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUserProfile } from '../lib/api';

interface User {
  id: number;
  email: string;
  username: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean | null;
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await getCurrentUserProfile();
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('❌ ERROR (on page load): Token validation failed.', error);
          localStorage.removeItem('token');
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };
    validateToken();
  }, []);

  const login = async (token: string) => {
    localStorage.setItem('token', token);
    try {
      const response = await getCurrentUserProfile();
      setUser(response.data);
      setIsAuthenticated(true);
      
      if (response.data.role === 'admin') {
          router.push('/admin');
      } else {
          router.push('/marketplace');
      }
    } catch (error) {
      console.error('❌ CRITICAL ERROR (after login): Failed to fetch profile.', error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};