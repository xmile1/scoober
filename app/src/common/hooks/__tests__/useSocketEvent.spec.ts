import { renderHook } from '@testing-library/react';
import { useSocketEvent } from '../useSocketEvent';
import { describe, expect, it, vi } from 'vitest';

const mockSocket = {
  on: vi.fn(),
  off: vi.fn(),
};

describe('useSocketEvent', () => {
  it('should attach and detach event listener', () => {
    const eventName = 'testEvent';
    const handler = vi.fn();

    const { unmount } = renderHook(() => useSocketEvent(mockSocket, eventName, handler));

    expect(mockSocket.on).toHaveBeenCalledWith(eventName, handler);
    unmount();
    expect(mockSocket.off).toHaveBeenCalledWith(eventName, handler);
  });
});
