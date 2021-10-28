export interface CommentData {
  email: string;
  name: string;
  text: string;
}

export type Comment = { _id: string; eventId: string } & CommentData;

export type PostCommentRequest = Omit<Comment, '_id'>;
