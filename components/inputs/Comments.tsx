import { useEffect, useState, useContext, useCallback } from 'react';
import { Comment, CommentData } from '@/types/comment.type';
import classes from '@/styles/inputs/Comments.module.css';
import NewComment from './NewComment';
import NotificationContext from 'context/NotificationContext';
import CommentList from './CommentList';
import commentsAPI from 'api/comments.api';
import { AxiosError } from 'axios';
import {
  NotificationStore,
  NotificationStatus,
} from '@/types/notification.type';

type CommentsProps = {
  eventId: string;
};

const Comments = ({ eventId }: CommentsProps) => {
  const [showComments, setShowComments] = useState<boolean>(false);
  const [loadedComments, setLoadedComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { showNotification } =
    useContext<NotificationStore>(NotificationContext);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  const fetchCommentsForEvent = useCallback(
    async (eventId: string): Promise<void> => {
      try {
        setLoading(true);
        const res = await commentsAPI.getAllCommentsByEventId(eventId);
        setLoadedComments(res.data);
      } catch (err) {
        const error = err as AxiosError;
        console.error(error.message);
        showNotification({
          title: 'Getting comments failed',
          message: error.message || 'Something went wrong',
          status: NotificationStatus.ERROR,
        });
      } finally {
        setLoading(false);
      }
    },
    [showNotification]
  );

  useEffect(() => {
    if (showComments && eventId) {
      // Fetch data from API
      fetchCommentsForEvent(eventId);
    }
  }, [showComments, eventId, fetchCommentsForEvent]);

  const addCommentHandler = async (commentData: CommentData): Promise<void> => {
    // send data to API
    try {
      showNotification({
        title: 'Add comment',
        message: 'Adding comments',
        status: NotificationStatus.PENDING,
      });
      const res = await commentsAPI.addComment(eventId, commentData);
      setLoadedComments((prevComments) => [res.data, ...prevComments]);
      showNotification({
        title: 'Add comment successful',
        message: 'Your comment has been submitted',
        status: NotificationStatus.SUCCESS,
      });
    } catch (err) {
      const error = err as AxiosError;
      console.error(error.message);
      showNotification({
        title: 'Adding comments failed',
        message: error.message || 'Something went wrong',
        status: NotificationStatus.ERROR,
      });
    }
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && loading && (
        <p className='centered'>Loading Comments...</p>
      )}
      {showComments && !loading && <CommentList comments={loadedComments} />}
    </section>
  );
};

export default Comments;
