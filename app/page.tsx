'use client';

import React from 'react';
import Link from 'next/link';
import LevelPreview from './components/LevelPreview';
import Loading from './components/Loading';
import Header from './components/Header';
import Footer from './components/Footer';
import SecondaryLinks from './components/SecondaryLinks';
import useLevels from './hooks/useLevels';

export default function HomePage() {
  const levels = useLevels();
  console.log('levels:', levels);
  if (levels == null) return <Loading />;

  return (
    <main>
      <Header className='flex flex-row content-between p-4 sticky top-0 z-10 bg-base-200 shadow-sm'>
        <p className='w-full text-3xl text-red-500 italic font-bold'>
          Pixel Hunt
        </p>
        <SecondaryLinks />
      </Header>

      <div className='flex justify-center mt-6'>
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
