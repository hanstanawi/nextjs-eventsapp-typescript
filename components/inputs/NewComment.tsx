import { CommentData } from '@/types/comment.type';
import { FormEvent, useRef, useState } from 'react';
import classes from '@/styles/inputs/NewComment.module.css';
import { validateEmail } from '@/helpers/validation.helper';

type NewCommentProps = {
  onAddComment: (commentData: CommentData) => Promise<void>;
};

const NewComment = ({ onAddComment }: NewCommentProps) => {
  const [isInvalid, setIsInvalid] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const sendCommentHandler = (e: FormEvent) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current;
    const enteredName = nameInputRef.current;
    const enteredComment = commentInputRef.current;

    if (enteredEmail && enteredName && enteredComment) {
      if (
        !enteredEmail.value ||
        enteredEmail.value.trim() === '' ||
        !validateEmail(enteredEmail.value) ||
        !enteredName.value ||
        enteredName.value.trim() === '' ||
        !enteredComment.value ||
        enteredComment.value.trim() === ''
      ) {
        setIsInvalid(true);
        return;
      }

      onAddComment({
        email: enteredEmail.value,
        name: enteredName.value,
        text: enteredComment.value,
      });
      enteredEmail.value = '';
      enteredName.value = '';
      enteredComment.value = '';
    }
  };

  return (
    <form className={classes.form} onSubmit={sendCommentHandler}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor='email'>Your email</label>
          <input type='email' id='email' ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='name'>Your name</label>
          <input type='text' id='name' ref={nameInputRef} />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor='comment'>Your comment</label>
        <textarea id='comment' rows={5} ref={commentInputRef}></textarea>
      </div>
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      <button>Submit</button>
    </form>
  );
};

export default NewComment;
