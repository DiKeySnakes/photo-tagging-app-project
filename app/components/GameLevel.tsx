import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import getLevelById from '../helpers/getLevelById';
import '../css/GameLevel.css';
import Instructions from './Instructions';
import Loading from './Loading';
import Notification from './Notification';
import LevelHeader from './LevelHeader';
import CharactersDropdown from './CharactersDropdown';
import GameImage from './GameImage';
import GameEnd from './GameEnd';
import PageNotFound from './PageNotFound';
import { ICharacter } from './Character';

export interface ILevel {
  id: string;
  name: string;
  image: string;
  characters: ICharacter[];
}

function GameLevel() {
  const { id } = useParams();
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
  const [foundList, setFoundList] = useState<ICharacter[]>([]);
  const [currentTimeout, setCurrentTimeout] = useState<number | null>(null);
  const [timer, setTimer] = useState<number | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const originalImg = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    async function fetchLevel() {
      try {
        const lvl = await getLevelById(id.toString());
        if (lvl !== null) {
          // Assuming lvl from getLevelById includes the characters property
          const img = new Image();
          img.src = lvl.image;
          originalImg.current = img;
        }
        setLevel(lvl);
      } catch (error: any) {
        if (error.message === 'No level found') setLevel('not found');
      }
    }

    fetchLevel();
  }, [id]);

  // Hide dropdown on resize since x and y coords will be different
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [imageRef.current?.scrollHeight, imageRef.current?.scrollWidth]);

  const onStart = () => {
    setIsStarted(true);
    setStartTime(Date.now());
    setCurrentTime(Date.now());
    const intervalId = setInterval(() => setCurrentTime(Date.now()), 25);
    setTimer(intervalId);
  };

  useEffect(() => {
    // if the game is over
    if (foundList.length === level?.characters?.length) {
      setIsGameOver(true);
      if (timer) clearInterval(timer);
    }
  }, [foundList.length, level]);

  // Work out the x and y coord as a percentage of the width.
  const getActualCoords = (x: number, y: number) => {
    // Gets original image's x and y percentage
    const percentage = {
      x: (x / originalImg.current?.naturalWidth || 1) * 100,
      y: (y / originalImg.current?.naturalHeight || 1) * 100,
    };
    // Convert x and y to decimal and then times by width/height
    const actualX = (percentage.x / 100) * (imageRef.current?.scrollWidth || 1);
    const actualY =
      (percentage.y / 100) * (imageRef.current?.scrollHeight || 1);
    return { x: actualX, y: actualY };
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isStarted || isGameOver) return;
    setIsDropdownOpen(!isDropdownOpen);
    const rect = e.currentTarget.getBoundingClientRect();
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

  const handleCharacterClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsDropdownOpen(false);
    const { submitter } = event.nativeEvent;
    const submitterId = +submitter.dataset.id;
    const character = level?.characters.find((char) => char.id === submitterId);
    if (character) {
      const { x, y } = character.coords;
      const { x: startX, y: startY } = getActualCoords(x.start, y.start);
      const { x: endX, y: endY } = getActualCoords(x.end, y.end);

      if (
        inRange(startX, endX, coordsClicked.x) &&
        inRange(startY, endY, coordsClicked.y)
      ) {
        character.found = true;
        const foundListItem = {
          x: x.start,
          y: y.start,
          name: character.name,
          id: character.id,
        };
        setFoundList([...foundList, foundListItem]);
        dispatch(`You found ${character.name}`, true, 3000);
      } else dispatch('Try again.', false, 3000);
    }
  };

  // Only allow scroll if the game is started
  document.body.style.overflow = isStarted && !isGameOver ? 'unset' : 'hidden';

  if (level === 'not found') return <PageNotFound />;
  if (level == null) return <Loading />;

  const timeTaken = currentTime - startTime;

  return (
    <div className='game-level'>
      {!isStarted && <Instructions onStart={onStart} level={level} />}
      {isGameOver && <GameEnd levelId={level.id} timeTaken={timeTaken} />}
      <LevelHeader timeTaken={timeTaken} characters={level.characters} />

      <div className='game-image-container'>
        <Notification
          message={notificationText}
          isShowing={isNotificationShowing}
          success={notificationSuccess}
        />

        <div className='game-image' ref={imageRef}>
          <GameImage
            photo={level.image}
            name={level.name}
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
