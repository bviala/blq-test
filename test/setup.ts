import {
    afterAll,
    afterEach,
    beforeAll,
  } from 'vitest';
  import { fetch } from 'cross-fetch';
  
  import { mockServer } from './mock-server';
  
  // Add `fetch` polyfill.
  global.fetch = fetch;
  
  beforeAll(() => mockServer.listen({ onUnhandledRequest: `error` }));
  afterAll(() => mockServer.close());
  afterEach(() => mockServer.resetHandlers());