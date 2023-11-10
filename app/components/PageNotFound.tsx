import Link from 'next/link';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';

function PageNotFound() {
  return (
    <div className='flex flex-col h-[100vh] justify-center text-center py-1'>
      <div className='flex flex-row justify-center mb-4 text-red-500'>
        <BsFillExclamationTriangleFill size={32} />
      </div>
      <div className='mb-3 uppercase text-3xl text-red-500'>not found</div>
      <p>i could not find what you were looking for.</p>
      <p>
        i can not point you in the right direction, but i can at least bring you
        back{' '}
        <Link href='/' className='text-blue-400'>
          home
        </Link>
        .
      </p>
    </div>
  );
}

export default PageNotFound;
