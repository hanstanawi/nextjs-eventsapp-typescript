import Link from 'next/link';
import navStyles from '@/styles/layout/MainNavigation.module.css';

const MainNavigation = () => {
  return (
    <header className={navStyles.header}>
      <div className={navStyles.logo}>
        <Link href='/'>NextEvents</Link>
      </div>
      <nav className={navStyles.navigation}>
        <ul>
          <li>
            <Link href='/events'>Browse All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
