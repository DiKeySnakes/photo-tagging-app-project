import React, { useEffect, useState } from 'react';
import '../css/Leaderboard.css';
import { useRouter } from 'next/router';
import Loading from './Loading';
import useLevels from '../hooks/useLevels';
import LevelPreview from './LevelPreview';
import LeaderboardTable from './LeaderboardTable';
import { ILevel } from './GameLevel';

function Leaderboard() {
  const levels = useLevels();
  const router = useRouter();
  const { query } = router;
  const levelId = query.level;

  const [activeLevel, setActiveLevel] = useState<ILevel | null>(null);

  useEffect(() => {
    if (levels == null || !levelId) return;

    const level = levels.find((lvl) => lvl.id === levelId);
    if (level) setActiveLevel(level);
  }, [levelId, levels]);

  document.body.style.overflow = 'unset';

  if (levels == null) return <Loading />;

  return (
    <div className='leaderboard'>
      <h1 className='leaderboard-title'>
        {activeLevel ? activeLevel.name : 'Select a level'}
      </h1>
      <div className='leaderboard-levels'>
        {levels.map((level) => (
          <button
            type='button'
            key={level.id}
            aria-label='level'
            className='leaderboard-level'
            onClick={() => setActiveLevel(level)}
            data-isActive={activeLevel ? level.id === activeLevel.id : false}>
            <LevelPreview level={level} />
          </button>
        ))}
      </div>

      <h2 className='leaderboard-title'>
        {activeLevel ? `Leaderboard - ${activeLevel.name}` : ''}
      </h2>
      <LeaderboardTable
        leaderboard={activeLevel ? activeLevel.leaderboard : []}
      />
    </div>
  );
}

export default Leaderboard;
