import Head from 'next/head';
import { Fragment } from 'react';
import EventList from '@/components/events/EventList';
import EventsSearch from '@/components/events/EventsSearch';
import { getAllEvents } from '@/helpers/api.helper';
import { useRouter } from 'next/router';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { Event } from '@/types/event.type';

type AllEventsPageProps = {
  allEvents: Event[];
};

const EventsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  allEvents,
}) => {
  const router = useRouter();

  const searchEventsHandler = (year: string, month: string): void => {
    router.push({
      pathname: '/events/[...slug]',
      query: { slug: [year, month] },
    });
  };

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name='description'
          content='Find a lot of events that allow you to evolve'
        />
      </Head>
      <EventsSearch onSearch={searchEventsHandler} />
      <EventList events={allEvents} />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps<AllEventsPageProps> = async () => {
  try {
    const events = await getAllEvents();
    return {
      props: {
        allEvents: events,
      },
      revalidate: 60,
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

export default EventsPage;
