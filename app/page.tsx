import Header from './components/Header';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from './components/Home';

function GithubLink() {
  return (
    <a
      href='https://github.com/Sharkri/where-is-waldo'
      className='github-repo'
      target='_blank'
      rel='noreferrer'
      aria-label='GitHub Repo'>
      <i className='fa-brands fa-github' />
    </a>
  );
}

export default function HomePage() {
  return (
    <main className='bg-base-200'>
      <Header>
        <GithubLink />
      </Header>
      <Home />
    </main>
  );
}
