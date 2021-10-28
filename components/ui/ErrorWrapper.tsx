import { Fragment } from 'react';
import Button from './Button';
import ErrorAlert from './ErrorAlert';

type ErrorWrapperProps = {
  errorMessage: string;
};

const ErrorWrapper = ({ errorMessage }: ErrorWrapperProps) => {
  return (
    <Fragment>
      <ErrorAlert>
        <p className='center'>{errorMessage}</p>
      </ErrorAlert>
      <div className='center'>
        <Button link='/events'>Show All Events</Button>
      </div>
    </Fragment>
  );
};

export default ErrorWrapper;
