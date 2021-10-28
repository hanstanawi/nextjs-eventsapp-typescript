import classes from '@/styles/event-details/EventSummary.module.css';

type EventSummaryProps = {
  title: string;
};

const EventSummary = ({ title }: EventSummaryProps) => {
  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
};

export default EventSummary;
