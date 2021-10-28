import { Fragment } from 'react';
import { Comment } from '@/types/comment.type';
import classes from '@/styles/inputs/CommentList.module.css';
import CommentItem from './CommentItem';

type CommentListProps = {
  comments: Comment[];
};

const CommentList = ({ comments }: CommentListProps) => {
  const noCommentsAdded = (
    <div className='centered'>
      <p>No comments added for this event</p>
    </div>
  );

  const commentsListContent = (
    <ul className={classes.comments}>
      {comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} />
      ))}
    </ul>
  );

  return (
    <Fragment>
      {!comments.length ? noCommentsAdded : commentsListContent}
    </Fragment>
  );
};

export default CommentList;
