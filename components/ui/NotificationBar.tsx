import { useContext } from 'react';
import NotificationContext from 'context/NotificationContext';
import notificationStyles from '@/styles/ui/Notification.module.css';
import {
  Notification,
  NotificationStore,
  NotificationStatus,
} from '@/types/notification.type';

const NotificationBar = ({ title, status, message }: Notification) => {
  const { hideNotification } =
    useContext<NotificationStore>(NotificationContext);
  let statusClasses = '';

  if (status === NotificationStatus.SUCCESS) {
    statusClasses = notificationStyles.success;
  }

  if (status === NotificationStatus.ERROR) {
    statusClasses = notificationStyles.error;
  }

  if (status === NotificationStatus.PENDING) {
    statusClasses = notificationStyles.pending;
  }

  const activeClasses = `${notificationStyles.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default NotificationBar;
