import { Hono } from 'hono';
import { health } from './routes/health.js';

export const app = new Hono();

app.route('/health', health);
app.get('/', (c) => c.json({ service: 'catalogue-api' }));
