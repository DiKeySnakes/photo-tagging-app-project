import { useState } from 'react';
import { useRouter } from 'next/navigation';
import formatTimeDuration from '../helpers/formatTimeDuration';
import createLeaderboardEntry from '../helpers/createLeaderboardEntry';

interface IGameEndProps {
  levelId: string;
  timeTaken: Date;
}

function GameEnd({ timeTaken, levelId }: IGameEndProps) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorActive, setIsErrorActive] = useState(false);
  const router = useRouter();
  const updateLeaderboard = async (e: React.SyntheticEvent<EventTarget>) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      await createLeaderboardEntry(levelId, name, timeTaken);
      router.push(`/leaderboard?level=${levelId}`);
    } catch (error) {
      setIsErrorActive(true);
      setIsLoading(false);
    }
  };

  return (
    <div className='game-end modal'>
      <div className='game-end-content'>
        <h2 className='time-finished-in'>
          You finished in {formatTimeDuration(timeTaken)}!
        </h2>
        <form
          action=''
          onSubmit={updateLeaderboard}
          className='submit-score-form'>
          <p>Submit your score on the global leaderboard!</p>

          <label htmlFor='name' className='name-label'>
            <span>Name:</span>
            <input
              id='name'
              type='text'
              placeholder="Don't use your real name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
              required
            />
          </label>
          {isErrorActive && (
            <span className='error-text'>
              Something went wrong. Please try again
            </span>
          )}
          <div className='game-end-buttons'>
            <button
              type='submit'
              className='submit-to-leaderboard'
              disabled={isLoading}>
              Submit Score
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GameEnd;
