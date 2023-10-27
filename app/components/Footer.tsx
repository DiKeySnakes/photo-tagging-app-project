import { AiFillGithub } from 'react-icons/ai';

function Footer() {
  return (
    <div className='w-full py-2 flex flex-col justify-center items-center text-sm'>
      <p>
        Created by DiKeySnakes for
        <a
          href='https://www.theodinproject.com'
          target='_blank'
          rel='noopener noreferrer'>
          {' '}
          The Odin Project
        </a>{' '}
        curriculum
      </p>
      <span className='flex flex-row items-center'>
        Copyright © DiKeySnakes 2023{' '}
        <a
          href='https://github.com/DiKeySnakes/photo-tagging-app-project'
          target='_blank'
          rel='noopener noreferrer'>
          <div className='ml-2'>
            <AiFillGithub />
          </div>
        </a>
      </span>
    </div>
  );
}

export default Footer;
