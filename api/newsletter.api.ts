import { Newsletter, NewsletterSubscription } from '@/types/newsletter.type';
import axios, { AxiosResponse } from 'axios';

const newsletterAPI = {
  addNewsletterSubscription(
    newsletterEmail: Newsletter
  ): Promise<AxiosResponse<NewsletterSubscription>> {
    return axios.post('/api/newsletter', newsletterEmail);
  },
};

export default newsletterAPI;
