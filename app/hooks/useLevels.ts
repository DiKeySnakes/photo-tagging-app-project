'use client';

import { useEffect, useState } from 'react';
// import getLevels from '@/app/helpers/getLevels';
import { ICharacter } from '../components/Character';
import { LeaderboardEntry } from '@prisma/client';

export default function useLevels() {
  const [levels, setLevels] = useState<
    {
      id: string;
      name: string;
      image: string;
      characters: ICharacter[];
      leaderboard: LeaderboardEntry[];
    }[]
  >([]);

  async function fetchLevels() {
    const res = await fetch('/api/levels', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const levelsData = await res.json();

    return levelsData;
  }

  useEffect(() => {
    fetchLevels().then((fetchedLevels) => {
      setLevels(fetchedLevels);
    });
  }, []);

  return levels;
}
