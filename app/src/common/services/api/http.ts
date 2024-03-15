class FetchInstance {
  private baseUrl: string;
  private defaultOptions: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async fetch(url: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      ...this.defaultOptions,
      ...options,
    });
    return response
  }
}

export default new FetchInstance(import.meta.env.VITE_API_URL);
