import Head from 'next/head';
import { Fragment } from 'react';
import { getEventById, getFeaturedEvents } from '@/helpers/api.helper';
import EventSummary from '@/components/event-details/EventSummary';
import EventContent from '@/components/event-details/EventContent';
import EventLogistics from '@/components/event-details/EventLogistics';
import ErrorWrapper from '@/components/ui/ErrorWrapper';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { Event } from '@/types/event.type';
import Comments from '@/components/inputs/Comments';

type EventPageProps = {
  event: Event | null;
};

const EventPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  event,
}) => {
  if (!event) {
    return <ErrorWrapper errorMessage={'No Event Found'} />;
  }

  const { title, date, location, image, description } = event;

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name='description' content={event.description} />
      </Head>
      <EventSummary title={title} />
      <EventLogistics
        date={date}
        image={image}
        imageAlt={title}
        address={location}
      />
      <EventContent>
        <p>{description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps<EventPageProps> = async ({
  params,
}) => {
  try {
    const eventId = params?.eventId as string;
    if (eventId) {
      const selectedEvent = await getEventById(eventId);
      return {
        props: {
          event: selectedEvent,
        },
        revalidate: 15,
      };
    }
    return {
      notFound: true,
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths<{ eventId: string }> = async () => {
  try {
    const events = await getFeaturedEvents();
    const eventIds = events.map((event) => {
      return {
        params: {
          eventId: event.id,
        },
      };
    });
    return {
      paths: eventIds,
      fallback: 'blocking',
    };
  } catch (err) {
    return {
      paths: [],
      fallback: true,
    };
  }
};

export default EventPage;
