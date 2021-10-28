import Head from 'next/head';
import { Fragment } from 'react';
import { filterEvents } from '@/helpers/api.helper';
import EventList from '@/components/events/EventList';
import ResultsTitle from '@/components/events/ResultsTitle';
import ErrorWrapper from '@/components/ui/ErrorWrapper';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { Event } from '@/types/event.type';
import { ParsedUrlQuery } from 'querystring';

type EventsFilterPageProps = {
  filteredEvents: Event[] | null;
  numYear: number | null;
  numMonth: number | null;
  error: string | null;
};

interface IParams extends ParsedUrlQuery {
  slug: [string, string];
}

const EventsFilterPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ filteredEvents, numMonth, numYear, error }) => {
  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name='description' content='A list of filtered events' />
    </Head>
  );

  if (error || !filteredEvents || !numYear || !numMonth) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorWrapper errorMessage={error || ''} />
      </Fragment>
    );
  }

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name='description'
        content={`All events for ${numYear}/${numMonth}`}
      />
    </Head>
  );

  if (!filteredEvents.length) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorWrapper errorMessage={'No Events during this period'} />
      </Fragment>
    );
  }

  const constructedDate = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={constructedDate} />
      <EventList events={filteredEvents} />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps<EventsFilterPageProps> =
  async ({ params }) => {
    const { slug } = params as IParams;

    if (!params) {
      return {
        notFound: true,
      };
    }

    if (slug.length > 2) {
      return {
        props: {
          error: 'Invalid query',
          filteredEvents: null,
          numMonth: null,
          numYear: null,
        },
      };
    }
    const [year, month] = slug;

    const numYear = Number(year);
    const numMonth = Number(month);

    if (
      isNaN(numYear) ||
      isNaN(numMonth) ||
      numYear > 2030 ||
      numYear < 2020 ||
      numMonth > 12 ||
      numMonth < 1
    ) {
      return {
        props: {
          error: 'Invalid filter. Please re-adjust your values!',
          filteredEvents: null,
          numMonth: null,
          numYear: null,
        },
      };
    }

    try {
      const filteredEvents = await filterEvents({
        month: numMonth,
        year: numYear,
      });
      return {
        props: {
          filteredEvents,
          numMonth,
          numYear,
          error: null,
        },
      };
    } catch (err) {
      return {
        notFound: true,
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  };

export default EventsFilterPage;
