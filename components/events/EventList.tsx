import { Event } from '@/types/event.type';
import { ReactElement } from 'react';
import EventItem from './EventItem';
import eventListStyles from '@/styles/events/EventList.module.css';

type EventListProps = {
  events: Event[];
};

const EventList = ({ events }: EventListProps): ReactElement => {
  return (
    <ul className={eventListStyles.list}>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
};

export default EventList;
