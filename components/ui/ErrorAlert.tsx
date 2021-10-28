import { ReactNode } from 'react';
import errorStyles from '@/styles/ui/ErrorAlert.module.css';

type ErrorAlertProps = {
  children: ReactNode;
};

const ErrorAlert = ({ children }: ErrorAlertProps) => {
  return <div className={errorStyles.alert}>{children}</div>;
};

export default ErrorAlert;
