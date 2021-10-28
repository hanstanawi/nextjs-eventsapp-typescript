import Head from 'next/head';
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { getFeaturedEvents } from '@/helpers/api.helper';
import { Fragment } from 'react';
import EventList from '@/components/events/EventList';
import { Event } from '@/types/event.type';
import NewsletterRegistration from '@/components/inputs/NewsletterRegistration';

type HomePageProps = {
  featuredEvents: Event[];
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  featuredEvents,
}) => {
  return (
    <Fragment>
      <Head>
        <title>NextJS Events</title>
        <meta
          name='description'
          content='Find a lot of events that allow you to evolve'
        />
      </Head>
      <NewsletterRegistration />
      <EventList events={featuredEvents} />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const featuredEvents = await getFeaturedEvents();
    return {
      props: {
        featuredEvents,
      },
      revalidate: 120,
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

export default Home;
