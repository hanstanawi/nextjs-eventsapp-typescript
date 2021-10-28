import { Notification, NotificationStore } from '@/types/notification.type';
import { createContext } from 'react';

const NotificationContext = createContext<NotificationStore>({
  notification: null,
  showNotification: (notificationData: Notification) => {},
  hideNotification: () => {},
});

export default NotificationContext;
