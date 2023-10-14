import Link from 'next/link';

interface IHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

const defaultProps: IHeaderProps = {
  children: null,
  className: '',
};

function Header({ children, className }: IHeaderProps) {
  return (
    <header className={className}>
      <ul className='links'>
        <li>
          <Link href='/' aria-label='home'>
            <i className='fa-solid fa-house' title='Homepage' />
          </Link>
        </li>
        <li>
          <Link href='/leaderboard'>
            <span className='leaderboard-link-text'>Leaderboard</span>
            <i
              className='fa-solid fa-ranking-star leaderboard-link-icon'
              title='Leaderboard'
            />
          </Link>
        </li>
      </ul>
      {children}
    </header>
  );
}

export default Header;
