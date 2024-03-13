import { vi } from 'vitest';

import '@testing-library/jest-dom'

import mockSocketIOClient from './tests/mocks/socket.io-client.mock';

vi.mock('socket.io-client', () => ({
  default: mockSocketIOClient,
  __esModule: true,
}));
