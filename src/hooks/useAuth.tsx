
import { useState, useEffect } from 'react';
import { AuthService } from '../services/auth.service';

interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = () => {
      const authStatus = AuthService.isAuthenticated();
      setIsAuthenticated(authStatus);
      
      if (authStatus) {
        const userData = AuthService.getCurrentUser();
        setUser(userData);
      } else {
        setUser(null);
      }
      
      setIsLoading(false);
    };

    checkAuth();

    // Listen for storage events (for logout across tabs)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    const result = await AuthService.login(credentials);
    
    if (result.success) {
      setUser(result.user);
      setIsAuthenticated(true);
    }
    
    setIsLoading(false);
    return result;
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout
  };
};
