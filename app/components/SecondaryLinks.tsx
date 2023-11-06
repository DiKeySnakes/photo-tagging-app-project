import Link from 'next/link';
import { AiFillGithub } from 'react-icons/ai';
import { AiFillInfoCircle } from 'react-icons/ai';

function SecondaryLinks() {
  return (
    <>
      <Link href='/about'>
        <span className='flex flex-row items-center text-2xl'>
          <div className='mr-2'>
            <AiFillInfoCircle />
          </div>
          About
        </span>
      </Link>
      <div className='ml-8'>
        <a
          href='https://github.com/DiKeySnakes/photo-tagging-app-project'
          target='_blank'
          rel='noreferrer'
          aria-label='GitHub Repo'>
          <AiFillGithub size={32} />
        </a>
      </div>
    </>
  );
}

export default SecondaryLinks;
