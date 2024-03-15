import { createContext, useState, ReactNode, useMemo } from "react";
import Notification from "../components/Notification";

interface NotificationContextType {
  showNotification: (message: string, duration?: number) => void;
}

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationContext = createContext<NotificationContextType>({
    showNotification: () => {},
  });

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notification, setNotification] = useState<string | null>(null);

  const providerValue = useMemo(() => ({
    showNotification: (message: string, duration = 3000) => {
      setNotification(message);
      setTimeout(() => {
        setNotification(null);
      }, duration);
    }
  }), []);

  return (
    <NotificationContext.Provider value={providerValue}>
      {children}
      {notification && <Notification message={notification} />}
    </NotificationContext.Provider>
  );
};
