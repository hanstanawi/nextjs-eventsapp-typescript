import Image from 'next/image';
import AddressIcon from '@/components/icons/AddressIcon';
import DateIcon from '@/components/icons/DateIcon';
import LogisticsItem from './LogisticsItem';
import classes from '@/styles/event-details/EventLogistics.module.css';
import { formatDate, formatAddress } from '@/helpers/events.helper';

type EventLogisticsProps = {
  date: string;
  address: string;
  image: string;
  imageAlt: string;
};

const EventLogistics = ({
  date,
  address,
  image,
  imageAlt,
}: EventLogisticsProps) => {
  const humanReadableDate = formatDate(date);
  const addressText = formatAddress(address);

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <Image src={`/${image}`} alt={imageAlt} width={240} height={240} />
      </div>
      <ul className={classes.list}>
        <LogisticsItem childrenIcon={<DateIcon />}>
          {<time>{humanReadableDate}</time>}
        </LogisticsItem>
        <LogisticsItem childrenIcon={<AddressIcon />}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
};

export default EventLogistics;
