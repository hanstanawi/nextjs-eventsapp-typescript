import { ReactNode, Fragment, useContext } from 'react';
import MainNavigation from './MainNavigation';
import NotificationContext from 'context/NotificationContext';
import NotificationBar from '@/components/ui/NotificationBar';
import { NotificationStore } from '@/types/notification.type';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { notification } = useContext<NotificationStore>(NotificationContext);
  return (
    <Fragment>
      <MainNavigation />
      <main>{children}</main>
      {notification ? (
        <NotificationBar
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      ) : null}
    </Fragment>
  );
};

export default Layout;
