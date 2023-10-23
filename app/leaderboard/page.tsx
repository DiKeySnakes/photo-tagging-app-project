import React from 'react';
import Leaderboard from '../components/Leaderboard';
import Header from '../components/Header';
import '@fortawesome/fontawesome-free/css/all.min.css';

function GithubLink() {
  return (
    <a
      href='#'
      className='github-repo'
      target='_blank'
      rel='noreferrer'
      aria-label='GitHub Repo'>
      <i className='fa-brands fa-github' />
    </a>
  );
}

export default function LeaderboardPage() {
  return (
    <>
      <Header>
        <GithubLink />
      </Header>
      <Leaderboard />
    </>
  );
}
