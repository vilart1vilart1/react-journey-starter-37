
import { useState, useEffect } from 'react';
import { authService, User } from '@/services/authService';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const result = await authService.login(email, password);
    if (result.success && result.user) {
      setUser(result.user);
      // User data is already stored in localStorage by authService
    }
    return result;
  };

  const signup = async (email: string, password: string, name?: string, phone?: string) => {
    const result = await authService.signup(email, password, name, phone);
    if (result.success && result.user) {
      setUser(result.user);
      // User data is already stored in localStorage by authService
      console.log('User signed up and logged in:', result.user);
    }
    return result;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout
  };
};
