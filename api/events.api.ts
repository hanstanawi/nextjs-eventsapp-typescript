import { EventResponse } from "@/types/event.type";
import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

const eventsAPI = {
  fetchAllEvents(): Promise<AxiosResponse<EventResponse>> {
    return axiosInstance.get('/events.json')
  },
  fetchEventById(eventId: string): Promise<AxiosResponse<EventResponse>> {
    return axiosInstance.get(`/events/${eventId}.json`)
  },
}

export default eventsAPI