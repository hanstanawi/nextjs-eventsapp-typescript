import { Notification, NotificationStatus } from '@/types/notification.type';
import { ReactNode, useState, useEffect, useCallback } from 'react';
import NotificationContext from './NotificationContext';

type NotificationProviderProps = {
  children: ReactNode;
};

const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotificationHandler = useCallback(
    (notificationData: Notification) => {
      setNotification(notificationData);
    },
    []
  );

  const hideNotificationHandler = useCallback(() => {
    setNotification(null);
  }, []);

  useEffect(() => {
    if (
      notification &&
      (notification.status === NotificationStatus.ERROR ||
        notification.status === NotificationStatus.SUCCESS)
    ) {
      setTimeout(() => {
        hideNotificationHandler();
      }, 3000);
    }

    return () => {
      clearTimeout();
    };
  }, [notification, hideNotificationHandler]);

  return (
    <NotificationContext.Provider
      value={{
        notification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
