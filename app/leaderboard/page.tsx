import { Suspense } from 'react';
import Leaderboard from '../components/Leaderboard';
import Header from '../components/Header';

function LeaderboardFallback() {
  return <>placeholder</>;
}

function GithubLink() {
  return (
    <a
      href='#'
      className='github-repo'
      target='_blank'
      rel='noreferrer'
      aria-label='GitHub Repo'>
      <span>icon here</span>
    </a>
  );
}

export default function LeaderboardPage() {
  return (
    <>
      <Header>
        <GithubLink />
      </Header>
      <Suspense fallback={<LeaderboardFallback />}>
        <Leaderboard />
      </Suspense>
    </>
  );
}
