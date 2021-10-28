import { Comment, CommentData } from '@/types/comment.type';
import axios, { AxiosResponse } from 'axios';

const commentsAPI = {
  getAllCommentsByEventId(eventId: string): Promise<AxiosResponse<Comment[]>> {
    return axios.get(`/api/comments/${eventId}`);
  },
  addComment(
    eventId: string,
    commentData: CommentData
  ): Promise<AxiosResponse<Comment>> {
    return axios.post(`/api/comments/${eventId}`, commentData);
  },
};

export default commentsAPI;
