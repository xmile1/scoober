import { describe, expect, it, vi, afterEach, beforeEach } from 'vitest';
import http from '../http';

describe('HTTP Service', () => {
  let originalFetch: typeof global.fetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = vi.fn(() => Promise.resolve(new Response(JSON.stringify({ data: 'test data' }))));
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('should correctly concatenate the base URL with the endpoint', async () => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const endpoint = '/test';
    await http.fetch(endpoint);
    expect(global.fetch).toHaveBeenCalledWith(`${baseUrl}${endpoint}`, expect.anything());
  });
});
