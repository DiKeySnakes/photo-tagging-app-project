'use client';

import useLevels from '@/app/hooks/useLevels';
import GameLevel, { ILevel } from '@/app/components/GameLevel';

export default function LevelId() {
  const levels = useLevels();

  return (
    <main className='bg-base-200'>
      <GameLevel levels={levels as ILevel[]} />
    </main>
  );
}
