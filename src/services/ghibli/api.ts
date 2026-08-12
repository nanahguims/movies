import axios, { AxiosInstance } from "axios";

const API_BASE_URL = "https://ghibliapi.vercel.app";

class GhibliAPIClient {
  private client: AxiosInstance;
  private cache: Map<string, unknown> = new Map();
  private cacheExpiry: Map<string, number> = new Map();
  private CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
    });
  }

  private getCacheKey(endpoint: string): string {
    return `ghibli_${endpoint}`;
  }

  private isCacheValid(key: string): boolean {
    const expiry = this.cacheExpiry.get(key);
    if (!expiry) return false;
    return Date.now() < expiry;
  }

  async get<T>(endpoint: string, useCache = true): Promise<T> {
    const cacheKey = this.getCacheKey(endpoint);

    if (useCache && this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey) as T;
    }

    try {
      const response = await this.client.get<T>(endpoint);
      const data = response.data;

      if (useCache) {
        this.cache.set(cacheKey, data);
        this.cacheExpiry.set(cacheKey, Date.now() + this.CACHE_DURATION);
      }

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`API Error: ${error.message}`);
      }
      throw error;
    }
  }

  clearCache(): void {
    this.cache.clear();
    this.cacheExpiry.clear();
  }

  clearCacheKey(endpoint: string): void {
    const cacheKey = this.getCacheKey(endpoint);
    this.cache.delete(cacheKey);
    this.cacheExpiry.delete(cacheKey);
  }
}

export const ghibliAPI = new GhibliAPIClient();
