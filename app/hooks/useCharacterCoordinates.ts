'use client';

import { useEffect, useState } from 'react';

interface ICoordinates {
  x: {
    id: string;
    startX: number;
    endX: number;
  };
  y: {
    id: string;
    startY: number;
    endY: number;
  };
}

export default function useCharacterCoordinates() {
  const [coordinates, setCoordinates] = useState<ICoordinates>();

  async function fetchCoordinates() {
    const res = await fetch('/api/coordinates', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const coordinatesData = await res.json();

    return coordinatesData;
  }

  useEffect(() => {
    fetchCoordinates().then((fetchedCoordinates) => {
      setCoordinates(fetchedCoordinates);
    });
  }, []);

  return coordinates;
}
