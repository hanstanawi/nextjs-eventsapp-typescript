export interface Newsletter {
  email: string;
}

export type NewsletterSubscription = { _id: string } & Newsletter;
