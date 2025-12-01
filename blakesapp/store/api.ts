// store/api.ts
// Get API URL from environment variable or use defaults
// Set EXPO_PUBLIC_API_URL environment variable to override
// For EC2: Use your EC2 public IP, e.g., http://YOUR_EC2_IP:8000/api
const getApiBaseUrl = () => {
  // Check for environment variable first
  if (typeof process !== 'undefined' && process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }
  
  // Default based on environment
  if (__DEV__) {
    // For development: try EC2 IP if available, otherwise localhost
    // You can set EXPO_PUBLIC_API_URL=http://YOUR_EC2_IP:8000/api in your .env file
    return 'http://localhost:8000/api';
  }
  
  // Production fallback
  return 'https://your-cloudflare-tunnel-url.com/api';
};

const API_BASE_URL = getApiBaseUrl();

export const api = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`GET ${endpoint} failed: ${response.statusText}`);
    }
    return response.json();
  },

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`POST ${endpoint} failed: ${response.statusText}`);
    }
    return response.json();
  },
};

