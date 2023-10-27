'use client';

import React from 'react';
import Link from 'next/link';
import { AiFillGithub } from 'react-icons/ai';
import { AiFillInfoCircle } from 'react-icons/ai';
import LevelPreview from './components/LevelPreview';
import Loading from './components/Loading';
import Header from './components/Header';
import Footer from './components/Footer';
import useLevels from './hooks/useLevels';

function GithubLink() {
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

export default function HomePage() {
  const levels = useLevels();
  console.log('levels:', levels);
  if (levels == null) return <Loading />;

  return (
    <main className='bg-base-200'>
      <Header className='flex flex-row content-between p-4 sticky top-0 z-10 bg-base-300 shadow-sm'>
        <GithubLink />
      </Header>

      <div className='flex justify-center mt-8'>
        <h1 className='card-title text-3xl'>Please choose level</h1>
      </div>

      <div className='w-full flex flex-row flex-wrap gap-8 justify-center p-6'>
        {levels.map((level) => (
          <Link
            href={`levels/${level.id}`}
            aria-label='link to level'
            key={level.id}>
            <LevelPreview level={level} showCharacters />
          </Link>
        ))}
      </div>
      <Footer />
    </main>
  );
}
