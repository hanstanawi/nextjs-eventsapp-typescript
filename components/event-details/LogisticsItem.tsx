import { ReactNode } from 'react';
import classes from '@/styles/event-details/LogisticsItem.module.css';

type LogisticsItemProps = {
  children: ReactNode;
  childrenIcon: ReactNode;
};

function LogisticsItem({ children, childrenIcon }: LogisticsItemProps) {
  return (
    <li className={classes.item}>
      <span className={classes.icon}>{childrenIcon}</span>
      <span className={classes.content}>{children}</span>
    </li>
  );
}

export default LogisticsItem;
