import Head from 'next/head';
import '../styles/globals.css';
import Layout from '@/components/layout/Layout';
import type { AppProps } from 'next/app';
import NotificationProvider from 'context/NotificationProvider';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <NotificationProvider>
      <Layout>
        <Head>
          <title>NextJS Events</title>
          <meta
            name='viewport'
            content='initial-scale=1.0, width=device-width'
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationProvider>
  );
};
export default MyApp;
