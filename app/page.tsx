'use client';

import React from 'react';
import Link from 'next/link';
import LevelPreview from './components/LevelPreview';
import Loading from './components/Loading';
import Header from './components/Header';
import useLevels from './hooks/useLevels';

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

export default function HomePage() {
  const levels = useLevels();
  console.log('levels:', levels);
  if (levels == null) return <Loading />;

  return (
    <main className='bg-base-200'>
      <Header>
        <GithubLink />
      </Header>
      <div className='home'>
        {levels.map((level) => (
          <Link
            href={`levels/${level.id}`}
            aria-label='link to level'
            key={level.id}>
            <LevelPreview level={level} showCharacters />
          </Link>
        ))}
      </div>
    </main>
  );
}
