import React from 'react';
import Link from 'next/link';
import LevelPreview from './LevelPreview';
import '../css/Home.css';
import Loading from './Loading';
import useLevels from '../hooks/useLevels';

function Home() {
  const levels = useLevels();
  document.body.style.overflow = 'unset';

  if (levels == null) return <Loading />;

  return (
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
  );
}

export default Home;
