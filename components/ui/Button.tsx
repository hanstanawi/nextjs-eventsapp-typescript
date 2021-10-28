import Link from 'next/link';
import { MouseEventHandler, ReactNode } from 'react';
import { UrlObject } from 'url';
import buttonStyles from '@/styles/ui/Button.module.css';

type ButtonProps = {
  children: ReactNode;
  link?: string | UrlObject;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button = ({ link, children, onClick }: ButtonProps) => {
  if (link) {
    return (
      <Link href={link}>
        <a className={buttonStyles.btn}>{children}</a>
      </Link>
    );
  }
  return (
    <button className={buttonStyles.btn} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
