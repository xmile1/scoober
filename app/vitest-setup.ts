import { vi } from 'vitest';

import '@testing-library/jest-dom'

import mockSocketIOClient from './tests/mocks/socket.io-client.mock';
// vi.mock('socket.io-client', () => mockSocketIOClient);
vi.mock('socket.io-client', () => ({
  default: mockSocketIOClient, // Note the `default` key here
  __esModule: true, // This property is important for ES module mocks
}));

// Optionally, attach `triggerSocketEvent` to the global object for easy access in tests
// global.triggerSocketEvent = triggerSocketEvent;
