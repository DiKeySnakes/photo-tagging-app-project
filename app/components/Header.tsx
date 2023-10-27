import Link from 'next/link';
import { AiFillHome } from 'react-icons/ai';
import { AiFillStar } from 'react-icons/ai';
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
      <ul className='w-full flex flex-row content-between items-center gap-4'>
        <li>
          <div className='mr-4'>
            <Link href='/' aria-label='home'>
              <AiFillHome size={24} />
            </Link>
          </div>
        </li>
        <li>
          <Link href='/leaderboard'>
            <span className='flex flex-row items-center text-2xl'>
              Leaderboard
              <div className='ml-2'>
                <AiFillStar />
              </div>
            </span>
          </Link>
        </li>
      </ul>
      {children}
    </header>
  );
}

export default Header;
