
const API_BASE_URL = 'https://www.respizenmedical.com/mylittle/api';

export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      console.log('Attempting login for:', email);
      
      const response = await fetch(`${API_BASE_URL}/auth/login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Login response:', data);
      
      if (data.success && data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('isLoggedIn', 'true');
        console.log('User logged in successfully:', data.user);
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Erreur de connexion au serveur'
      };
    }
  },

  async signup(email: string, password: string, name?: string, phone?: string): Promise<AuthResponse> {
    try {
      // Split the full name into first_name and last_name
      let first_name = '';
      let last_name = '';
      
      if (name && name.trim()) {
        const nameParts = name.trim().split(' ');
        first_name = nameParts[0] || '';
        last_name = nameParts.slice(1).join(' ') || '';
      }
      
      const signupData = { 
        email, 
        password, 
        first_name,
        last_name,
        phone: phone || ''
      };
      
      console.log('Signup data being sent:', signupData);
      
      const response = await fetch(`${API_BASE_URL}/auth/signup.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();
      console.log('Signup response:', data);
      
      if (data.success && data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('isLoggedIn', 'true');
        console.log('User signed up successfully:', data.user);
      }
      
      return data;
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        message: 'Erreur de connexion au serveur'
      };
    }
  },

  async updateProfile(userInfo: { name: string; email: string; phone?: string; password?: string }): Promise<AuthResponse> {
    try {
      const currentUser = this.getCurrentUser();
      if (!currentUser) {
        return {
          success: false,
          message: 'Utilisateur non connecté'
        };
      }

      // Split the full name into first_name and last_name
      let first_name = '';
      let last_name = '';
      
      if (userInfo.name && userInfo.name.trim()) {
        const nameParts = userInfo.name.trim().split(' ');
        first_name = nameParts[0] || '';
        last_name = nameParts.slice(1).join(' ') || '';
      }
      
      const requestBody: any = {
        user_id: currentUser.id,
        first_name,
        last_name,
        email: userInfo.email,
        phone: userInfo.phone || ''
      };

      // Only include password if it's being changed
      if (userInfo.password) {
        requestBody.password = userInfo.password;
      }
      
      console.log('Updating profile with data:', requestBody);
      
      const response = await fetch(`${API_BASE_URL}/auth/update_profile.php`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log('Update profile response:', data);
      
      if (data.success && data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('Profile updated successfully:', data.user);
      }
      
      return data;
    } catch (error) {
      console.error('Update profile error:', error);
      return {
        success: false,
        message: 'Erreur de connexion au serveur'
      };
    }
  },

  logout() {
    console.log('User logging out');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
  },

  getCurrentUser(): User | null {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  },

  isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
};
