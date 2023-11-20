'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import formatTimeDuration from '../helpers/formatTimeDuration';
import Modal from './Modal';

interface IGameEndProps {
  levelId: string;
  timeTaken: number;
}

function GameEndModal({ timeTaken, levelId }: IGameEndProps) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorActive, setIsErrorActive] = useState(false);
  const router = useRouter();

  const closeModal = (id: string) => {
    const modalElement = document.getElementById(id) as HTMLFormElement;
    if (modalElement) {
      modalElement.close();
    } else {
      console.error("Modal element with ID 'game-start-modal' not found");
    }
    return null;
  };

  async function createNewLeaderboardEntry(
    levelId: string,
    name: string,
    timeTaken: number
  ) {
    await fetch('/api/leaderboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ levelId, name, timeTaken }),
    });
  }

  const updateLeaderboard = async (e: React.SyntheticEvent<EventTarget>) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      await createNewLeaderboardEntry(levelId, name, timeTaken);
      closeModal('game-end-modal');
      router.push(`/newEntry?level=${levelId}`);
    } catch (error) {
      setIsErrorActive(true);
      setIsLoading(false);
    }
  };

  return (
    <Modal id='game-end-modal'>
      <div className='p-5 rounded-lg'>
        <h2 className='p-5 text-center text-3xl border-b-2 border-gray-500'>
          You finished in {formatTimeDuration(timeTaken)}!
        </h2>
        <form
          action=''
          onSubmit={updateLeaderboard}
          className='flex flex-col p-5'>
          <p className='mb-6 text-center text-2xl font-semibold'>
            Submit your score on the global leaderboard!
          </p>

          <label
            htmlFor='name'
            className='flex flex-col gap-2 font-bold text-2xl'>
            <span>Name:</span>
            <input
              id='name'
              type='text'
              placeholder="Don't use your real name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
              required
              className='p-2 outline-1 outline-slate-500 rounded-md'
            />
          </label>
          {isErrorActive && (
            <span className='mt-4 text-red-500 font-semibold text-2xl'>
              Something went wrong. Please try again
            </span>
          )}
          <div className='flex justify-center mt-6'>
            <button
              type='submit'
              className='btn btn-primary mt-6'
              disabled={isLoading}>
              Submit Score
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default GameEndModal;
