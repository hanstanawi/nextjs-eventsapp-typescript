import { Event, EventResponse } from '@/types/event.type';

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const formatResultDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
};

export const formatAddress = (location: string): string => {
  return location.replace(', ', '\n');
};

export const formatEventResponse = (eventObj: EventResponse): Event[] => {
  const eventsList = []
  for (const eventId in eventObj) {
    eventsList.push({
      ...eventObj[eventId],
      id: eventId
    })
  }
  return eventsList
}
