import Image from 'next/image';
import Button from '../ui/Button';
import eventItemStyles from '@/styles/events/EventItem.module.css';
import AddressIcon from '../icons/AddressIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import DateIcon from '../icons/DateIcon';
import { Event } from '@/types/event.type';
import { formatAddress, formatDate } from '@/helpers/events.helper';

type EventItemProps = {
  event: Event;
};

const EventItem = ({ event }: EventItemProps) => {
  const { image, location, title, date, id } = event;

  const formattedDate = formatDate(date);

  const formattedAddress = formatAddress(location);

  return (
    <li className={eventItemStyles.item}>
      <Image src={`/${image}`} alt={title} width={250} height={200} />
      <div className={eventItemStyles.content}>
        <div className={eventItemStyles.su}>
          <h2>{title}</h2>
          <div className={eventItemStyles.date}>
            <DateIcon />
            <time>{formattedDate}</time>
          </div>
          <div className={eventItemStyles.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={eventItemStyles.actions}>
          <Button
            link={{ pathname: 'events/[eventId]', query: { eventId: id } }}
          >
            <span>Explore Event</span>
            <span className={eventItemStyles.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
