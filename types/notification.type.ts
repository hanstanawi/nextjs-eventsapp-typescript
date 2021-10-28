export enum NotificationStatus {
  SUCCESS = 'success',
  PENDING = 'pending',
  ERROR = 'error',
}

export interface Notification {
  status:
    | NotificationStatus.ERROR
    | NotificationStatus.PENDING
    | NotificationStatus.SUCCESS;
  message: string;
  title: string;
}

export interface NotificationStore {
  notification: Notification | null;
  showNotification: (notificationData: Notification) => void;
  hideNotification: () => void;
}
