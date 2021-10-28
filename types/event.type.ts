export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  date: string;
  isFeatured: boolean;
}

export interface EventResponse {
  [eventId: string]: Event
}