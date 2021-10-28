import { Comment } from '@/types/comment.type';

type CommentItemProps = {
  comment: Comment;
};

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <li>
      <p>{comment.text}</p>
      <div>
        By <address>{comment.name}</address>
      </div>
    </li>
  );
};

export default CommentItem;
