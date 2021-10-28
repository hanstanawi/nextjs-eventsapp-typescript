import { Event } from '@/types/event.type';
import eventsAPI from 'api/events.api';
import { formatEventResponse } from './events.helper';

export const getAllEvents = async (): Promise<Event[]> => {
  try {
    const res = await eventsAPI.fetchAllEvents()
    const eventsList = formatEventResponse(res.data)
    return eventsList
  } catch (err) {
    console.error(err)
    throw err
  }
};

export const getFeaturedEvents = async (): Promise<Event[]> => {
  try {
    const events = await getAllEvents()
    return events.filter(event => event.isFeatured)
  } catch (err) {
    console.error(err)
    throw err
  }
};

export const getEventById = async (eventId: string): Promise<Event | null> => {
  try {
    const events = await getAllEvents()
    return events.find(event => event.id === eventId) || null
  } catch (err) {
    console.error(err)
    throw err
  }
};

export const filterEvents = async (dateFilter: {
  month: number;
  year: number;
}): Promise<Event[]> => {
  const events = await getAllEvents();
  const { month, year } = dateFilter;

  return events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
};
