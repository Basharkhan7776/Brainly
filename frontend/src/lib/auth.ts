import { toast } from 'sonner';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api/v1';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export const api = {
  async request<T>(
    endpoint: string,
    options: { method?: string; data?: any } = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await axiosInstance({
        url: endpoint,
        method: options.method || 'GET',
        data: options.data,
      });

      return { data: response.data };
    } catch (error) {
      console.error('API request error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
      toast.error(errorMessage);
      return { error: errorMessage };
    }
  },

  // Auth endpoints
  auth: {
    async signin(email: string, password: string) {
      const response = await api.request<{ token: string }>('/auth/signin', {
        method: 'POST',
        data: { email, password },
      });

      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
      }

      return response;
    },

    async signup(name: string, email: string, password: string) {
      const response = await api.request<{ token: string }>('/auth/signup', {
        method: 'POST',
        data: { name, email, password },
      });

      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
      }

      return response;
    },

    signout() {
      localStorage.removeItem('token');
      toast.success('Signed out successfully');
    },

    isAuthenticated() {
      return !!localStorage.getItem('token');
    },
  },
}; 