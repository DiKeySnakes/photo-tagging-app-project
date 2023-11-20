import { useEffect, useState, useRef } from 'react';
import { LeaderboardEntry } from '@prisma/client';

const POLLING_INTERVAL = 1000;

export default function useLeaderboardEntries() {
  const [leaderboardEntries, setLeaderboardEntries] = useState<
    LeaderboardEntry[]
  >([]);
  const pollingIntervalIdRef = useRef<NodeJS.Timeout | null>(null);

  async function fetchLeaderboard() {
    try {
      const res = await fetch('/api/winners', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });
      const entriesData = await res.json();

      return entriesData;
    } catch (error) {
      console.error('Error fetching leaderboard entries:', error);
      throw error;
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedEntries = await fetchLeaderboard();
        setLeaderboardEntries(fetchedEntries);

        pollingIntervalIdRef.current = setInterval(async () => {
          const refreshedEntries = await fetchLeaderboard();
          setLeaderboardEntries(refreshedEntries);
        }, POLLING_INTERVAL);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();

    // Cleanup function
    return () => {
      if (pollingIntervalIdRef.current !== null) {
        clearInterval(pollingIntervalIdRef.current);
      }
    };
  }, []);

  return leaderboardEntries;
}
