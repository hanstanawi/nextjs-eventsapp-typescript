import { FormEvent, useRef, useContext } from 'react';
import { validateEmail } from '@/helpers/validation.helper';
import classes from '@/styles/inputs/NewsletterRegistration.module.css';
import newsletterAPI from 'api/newsletter.api';
import {
  NotificationStatus,
  NotificationStore,
} from '@/types/notification.type';
import NotificationContext from 'context/NotificationContext';

const NewsletterRegistration = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const { showNotification, notification } =
    useContext<NotificationStore>(NotificationContext);

  const registrationHandler = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const emailRefInput = emailRef.current;
    // fetch user input (state or refs)
    // optional: validate input
    if (emailRefInput) {
      if (!emailRefInput.value && !validateEmail(emailRefInput.value)) {
        return;
      }
      // send valid data to API
      try {
        showNotification({
          title: 'Register Newsletter',
          message: 'Submitting email address for registration',
          status: NotificationStatus.PENDING,
        });
        await newsletterAPI.addNewsletterSubscription({
          email: emailRefInput.value,
        });
        emailRefInput.value = '';
        showNotification({
          title: 'Registration Completed',
          message:
            'Thank you for registring to our newsletter! We will keep you updated',
          status: NotificationStatus.SUCCESS,
        });
      } catch (err) {
        const error = err as Error;
        console.error(error.message);
        showNotification({
          title: 'Registration Failed',
          message: error.message || 'Something went wrong',
          status: NotificationStatus.ERROR,
        });
      }
    }
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
};

export default NewsletterRegistration;
