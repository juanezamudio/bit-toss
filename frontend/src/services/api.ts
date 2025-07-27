// Configure API endpoints
const API_CONFIG = {
  development: 'http://localhost:18888',
  production: import.meta.env.VITE_API_URL || 'https://your-api-domain.com'
};

interface ApiClientConfig {
  baseUrl: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl;
  }

  async getLatestBlock() {
    try {
      const response = await fetch(`${this.baseUrl}/block/latest`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching latest block:', error);
      throw error;
    }
  }

  async getBlocks(limit: number = 10) {
    try {
      const response = await fetch(`${this.baseUrl}/blocks?limit=${limit}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching blocks:', error);
      throw error;
    }
  }
}

// Create API client
const apiClient = new ApiClient({
  baseUrl: import.meta.env.DEV ? API_CONFIG.development : API_CONFIG.production
});

export default apiClient;
