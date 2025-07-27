// Configure API endpoints
const API_CONFIG = {
  development: 'https://mainnet.sandshrew.io/v4/wrlckwrld',
  production: 'https://mainnet.sandshrew.io/v4/wrlckwrld'
};

interface ApiClientConfig {
  baseUrl: string;
}

class ApiClient {
  private baseUrl: string;
  private requestId: number;

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl;
    this.requestId = 1;
  }

  private async rpcRequest(method: string, params: any[]) {
    const request = {
      jsonrpc: '2.0',
      method,
      params,
      id: this.requestId++,
    };

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message);
      }
      return data.result;
    } catch (error) {
      console.error(`Error in RPC request for method ${method}:`, error);
      throw error;
    }
  }

  async getLatestBlockHash() {
    return this.rpcRequest('esplora_blocks:tip:hash', []);
  }

  async getLatestBlockHeight() {
    return this.rpcRequest('esplora_blocks:tip:height', []);
  }

  async getBlock(hash: string) {
    return this.rpcRequest('esplora_block', [hash]);
  }

  async getBlocks(start_height?: number) {
    const params = start_height ? [start_height] : [];
    return this.rpcRequest('esplora_blocks', params);
  }
}

// Create API client
const apiClient = new ApiClient({
  baseUrl: import.meta.env.DEV ? API_CONFIG.development : API_CONFIG.production
});

export default apiClient;
