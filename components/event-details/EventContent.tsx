import { ReactNode } from 'react';
import classes from '@/styles/event-details/EventContent.module.css';

type EventContentProps = {
  children: ReactNode;
};

const EventContent = ({ children }: EventContentProps) => {
  return <section className={classes.content}>{children}</section>;
};

export default EventContent;
