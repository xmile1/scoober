import { useEffect } from 'react';

export const useSocketEvent = (socket: any, eventName: string, handler: any) => {
  useEffect(() => {
    if (socket) {
      socket.on(eventName, handler);
    }

    return () => {
      if (socket) {
        socket.off(eventName, handler);
      }
    };
  }, [socket, eventName, handler]);
};
