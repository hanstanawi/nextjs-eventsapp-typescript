import Button from '@/components/ui/Button';
import classes from '@/styles/events/ResultsTitle.module.css';
import { formatResultDate } from '@/helpers/events.helper';

type ResultsTitleProps = {
  date: Date;
};

const ResultsTitle = ({ date }: ResultsTitleProps) => {
  const humanReadableDate = formatResultDate(date);

  return (
    <section className={classes.title}>
      <h1>Events in {humanReadableDate}</h1>
      <Button link='/events'>Show all events</Button>
    </section>
  );
};

export default ResultsTitle;
