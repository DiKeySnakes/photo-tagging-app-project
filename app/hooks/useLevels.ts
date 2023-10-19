import { useEffect, useState } from 'react';
import getLevels from '@/app/helpers/getLevels';

export default function useLevels() {
  const [levels, setLevels] = useState<
    { id: string; name: string; image: string; gameId: string }[]
  >([]);

  useEffect(() => {
    getLevels().then((fetchedLevels) => {
      setLevels(fetchedLevels);
    });
  }, []);

  return levels;
}
