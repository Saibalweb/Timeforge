import axios from 'axios';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

// Simulated API calls
export const login = async (credentials: { email: string; password: string }) => {
  // For demo, simulate a successful login
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate API validation
  if (credentials.email === 'test@example.com' && credentials.password === 'password') {
    return {
      token: 'dummy-jwt-token',
      user: {
        id: '1',
        name: 'Test User',
        email: credentials.email
      }
    };
  }
  
  throw new Error('Invalid credentials');
};

export const signup = async (userData: { name: string; email: string; password: string }) => {
  // For demo, simulate a successful signup
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    token: 'dummy-jwt-token',
    user: {
      id: '1',
      name: userData.name,
      email: userData.email
    }
  };
};

export const logout = async () => {
  // For demo, simulate a successful logout
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
}; 