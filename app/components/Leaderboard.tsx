'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Loading from './Loading';
import useLevels from '../hooks/useLevels';
import LevelPreview from './LevelPreview';
import LeaderboardTable from './LeaderboardTable';
import { ILevel } from './GameLevel';

function Leaderboard() {
  const levels = useLevels();
  const searchParams = useSearchParams();
  const levelId = searchParams.get('level');

  const [activeLevel, setActiveLevel] = useState<ILevel | null>(null);

  useEffect(() => {
    if (levels == null || !levelId) return;

    const level = levels.find((lvl) => lvl.id === levelId);
    if (level) setActiveLevel(level);
  }, [levelId, levels]);

  // document.body.style.overflow = 'unset';

  if (levels == null) return <Loading />;

  return (
    <div className='px-6 py-3'>
      <h1 className='text-center text-3xl font-semibold my-5'>
        {activeLevel ? activeLevel.name : 'Select a level'}
      </h1>
      <div className='w-ful flex flex-row flex-wrap justify-center gap-6 mb-4 pb-4'>
        {levels.map((level) => (
          <button
            type='button'
            key={level.id}
            aria-label='level'
            onClick={() => setActiveLevel(level)}
            data-isActive={activeLevel ? level.id === activeLevel.id : false}>
            <LevelPreview level={level} />
          </button>
        ))}
      </div>

      <h2 className='text-center text-3xl font-semibold my-5'>
        {activeLevel ? `Leaderboard - ${activeLevel.name}` : ''}
      </h2>
      <LeaderboardTable
        leaderboard={activeLevel ? activeLevel.leaderboard : []}
      />
    </div>
  );
}

export default Leaderboard;
