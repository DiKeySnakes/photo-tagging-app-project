import Link from 'next/link';
import '../css/PageNotFound.css';

function PageNotFound() {
  return (
    <div id='not-found'>
      <i className='fa-solid fa-triangle-exclamation' />
      <h1>not found</h1>
      <p>i could not find what you were looking for.</p>
      <p>
        i can not point you in the right direction, but i can at least bring you
        back <Link href='/'>home</Link>.
      </p>
    </div>
  );
}

export default PageNotFound;
