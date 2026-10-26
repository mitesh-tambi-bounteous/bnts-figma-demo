import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the heading', () => {
    expect(renderToString(<App />)).toContain('<h1>Web App</h1>');
  });
});
