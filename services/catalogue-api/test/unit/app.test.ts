import { describe, expect, it } from 'vitest';
import { app } from '../../src/app.js';

describe('app', () => {
  it('GET /health returns ok', async () => {
    const res = await app.request('/health');
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ status: 'ok' });
  });

  it('GET / identifies the service', async () => {
    const res = await app.request('/');
    expect(await res.json()).toEqual({ service: 'catalogue-api' });
  });
});
