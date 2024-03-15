import { vi } from "vitest";

const eventCallbacks: Record<string, any> = {};

export const socket = {
  emit: vi.fn(),
  on: (event: string, callback: any) => {
    eventCallbacks[event] = callback;
  },
  off: vi.fn(),
  connect: vi.fn(() => { }),
  disconnect: vi.fn(),
};

export const triggerSocketEvent = (event: string, ...args: any[]) => {
  if (eventCallbacks[event]) {
    eventCallbacks[event](...args);
  }
};

export default vi.fn(() => socket);
