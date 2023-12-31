'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import GameStartModal from './GameStartModal';
import GameEndModal from './GameEndModal';
import Loading from './Loading';
import Notification from './Notification';
import LevelHeader from './LevelHeader';
import CharactersDropdown from './CharactersDropdown';
import GameImage from './GameImage';
import PageNotFound from './PageNotFound';
import { ICharacter } from './Character';
import { LeaderboardEntry } from '@prisma/client';

export interface IGameLevelParams {
  levels: ILevel[];
}

export interface ILevel {
  id: string;
  name: string;
  image: string;
  characters: ICharacter[];
  leaderboard: LeaderboardEntry[];
}

interface IFoundListItem {
  x: number;
  y: number;
  name: string;
  position: number;
}

function GameLevel(levels: IGameLevelParams) {
  const params = useParams();
  const id = params.levelId;
  const [level, setLevel] = useState<ILevel | 'not found' | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationShowing, setIsNotificationShowing] = useState(false);
  const [notificationText, setNotificationText] = useState('');
  const [notificationSuccess, setNotificationSuccess] = useState(false);
  const [coordsClicked, setCoordsClicked] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [foundList, setFoundList] = useState<IFoundListItem[]>([]);
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const originalImg = useRef<HTMLImageElement | null>(null);

  const openModal = (id: string) => {
    const modalElement = document.getElementById(id) as HTMLDialogElement;

    if (modalElement) {
      if (modalElement.showModal) {
        modalElement.showModal();
      } else {
        // Fallback for browsers that don't support showModal
        modalElement.style.display = 'block';
      }
    } else {
      console.error(`Modal element with ID '${id}' not found`);
    }
  };

  const closeModal = (id: string) => {
    const modalElement = document.getElementById(id) as HTMLDialogElement;

    if (modalElement) {
      if (modalElement.close) {
        modalElement.close();
      } else {
        // Fallback for browsers that don't support close
        modalElement.style.display = 'none';
      }
    } else {
      console.error(`Modal element with ID '${id}' not found`);
    }
  };

  useEffect(() => {
    const levelData = levels.levels.find((item) => item.id === id);

    if (levelData) {
      // Assuming levelData from the prop includes the characters property
      const img = new Image();
      img.src = levelData.image;
      img.onload = () => {
        img.width = imageRef.current?.scrollWidth ?? 0;
        img.height = imageRef.current?.scrollHeight ?? 0;
        originalImg.current = img;
      };
    }

    setLevel(levelData || 'not found');
  }, [id, levels]);

  // Hide dropdown on resize since x and y coords will be different
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [imageRef.current?.scrollHeight, imageRef.current?.scrollWidth]);

  const onStart = () => {
    setIsStarted(true);
    setStartTime(Date.now());
    setCurrentTime(Date.now());
    const intervalId: NodeJS.Timeout = setInterval(
      () => setCurrentTime(Date.now()),
      25
    );
    setTimer(intervalId);
    closeModal('game-start-modal');
  };

  useEffect(() => {
    // if the game is over
    if (
      level !== 'not found' &&
      level !== null &&
      foundList.length === level.characters.length
    ) {
      setIsGameOver(true);
      if (timer) clearInterval(timer);
    }
  }, [foundList.length, level, timer]);

  useEffect(() => {
    if (!isStarted && level !== null) {
      openModal('game-start-modal');
    }
  }, [isStarted, level]);

  useEffect(() => {
    if (isGameOver && level !== null) {
      openModal('game-end-modal');
    }
  }, [isGameOver, level]);

  const getActualCoords = (x: number, y: number) => {
    // Gets original image's x and y percentage
    const originalImgRef = originalImg.current;
    const imageRefElement = imageRef.current;

    if (!originalImgRef || !imageRefElement) {
      // Handle the case where the refs are not set
      return { x: 0, y: 0 };
    }

    const percentage = {
      x: (x / (originalImgRef.naturalWidth || 1)) * 100,
      y: (y / (originalImgRef.naturalHeight || 1)) * 100,
    };

    const actualX = (percentage.x / 100) * (imageRefElement.scrollWidth || 1);
    const actualY = (percentage.y / 100) * (imageRefElement.scrollHeight || 1);

    return { x: actualX, y: actualY };
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isStarted || isGameOver) return;
    setIsDropdownOpen(!isDropdownOpen);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoordsClicked({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const inRange = (start: number, end: number, value: number) =>
    value >= start && value <= end;

  const dispatch = (message: string, isSuccessful: boolean, time: number) => {
    // If the notification is already showing and the same message
    if (isNotificationShowing && notificationText === message) return;
    setNotificationText(message);
    setNotificationSuccess(isSuccessful);
    setIsNotificationShowing(true);
    // If the current ongoing setTimeout, clear it first
    if (currentTimeout !== null) clearTimeout(currentTimeout);

    const timeoutId = setTimeout(() => {
      setIsNotificationShowing(false);
    }, time);
    setCurrentTimeout(timeoutId);
  };

  async function fetchCoordinates(characterId: string) {
    const res = await fetch(`/api/coordinates/${characterId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const coordinatesData = await res.json();

    return coordinatesData;
  }

  const handleCharacterClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setIsDropdownOpen(false);
    const submitter = event.currentTarget as HTMLAnchorElement;
    const submitterId = submitter.dataset.id;

    const character = (level as ILevel)?.characters.find(
      (char: ICharacter) => char.id === submitterId
    );

    if (character) {
      fetchCoordinates(character.id)
        .then((coordinates) => {
          if (coordinates) {
            const x = coordinates.x;
            const y = coordinates.y;
            const { x: startX, y: startY } = getActualCoords(
              x.startX,
              y.startY
            );
            const { x: endX, y: endY } = getActualCoords(x.endX, y.endY);

            if (
              inRange(startX, endX, coordsClicked.x) &&
              inRange(startY, endY, coordsClicked.y)
            ) {
              (character as ICharacter).found = true;
              const foundListItem: IFoundListItem = {
                x: x.startX,
                y: y.startY,
                name: character?.name || '',
                position: character?.position,
              };

              setFoundList([...foundList, foundListItem]);
              dispatch(`You found ${character.name}`, true, 3000);
            } else dispatch('Try again.', false, 3000);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  if (level === 'not found') return <PageNotFound />;
  if (level == null) return <Loading />;

  const timeTaken = currentTime - startTime;

  const containerSize = {
    height: imageRef.current?.scrollHeight ?? 0,
    width: imageRef.current?.scrollWidth ?? 0,
  };

  return (
    <div>
      <GameStartModal onStart={onStart} level={level} />
      <GameEndModal levelId={level.id} timeTaken={timeTaken} />
      <LevelHeader timeTaken={timeTaken} characters={level.characters} />
      <div className='relative'>
        <Notification
          message={notificationText}
          isShowing={isNotificationShowing}
          success={notificationSuccess}
        />

        <div className='w-full' ref={imageRef}>
          <GameImage
            name={level.name}
            image={level.image}
            onImageClick={handleImageClick}
            foundList={
              // Hide the found list if the game is over
              isGameOver
                ? []
                : foundList.map(({ x, y, ...rest }) => ({
                    ...getActualCoords(x, y),
                    ...rest,
                  }))
            }
          />
        </div>

        {isDropdownOpen && (
          <CharactersDropdown
            containerSize={containerSize}
            onCharacterClick={handleCharacterClick}
            coordinates={coordsClicked}
            characters={level.characters}
          />
        )}
      </div>
    </div>
  );
}

export default GameLevel;
