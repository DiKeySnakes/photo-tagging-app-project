import { useEffect, useState } from 'react';
import getLevels from '@/app/helpers/getLevels';
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

  useEffect(() => {
    getLevels().then((fetchedLevels) => {
      setLevels(fetchedLevels);
    });
  }, []);

  return levels;
}
