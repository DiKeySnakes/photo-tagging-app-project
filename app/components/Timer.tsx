import { intervalToDuration } from 'date-fns';
import { useEffect } from 'react';

export interface ITimer {
  minutes: number;
  seconds: number;
  ms: number;
}

interface ITimerProps {
  isGameActive: boolean;
  updateCurrentTime: (time: number) => void;
  updateStartTime: (time: number) => void;
  startTime: number;
  currentTime: number;
  finalTimerTime: {
    minutes: number;
    seconds: number;
    ms: number;
  };
}

function Timer({
  isGameActive,
  updateCurrentTime,
  updateStartTime,
  startTime,
  currentTime,
  finalTimerTime,
}: ITimerProps) {
  useEffect(() => {
    updateCurrentTime(Date.now());
    let interval: NodeJS.Timeout | null = null;

    if (isGameActive) {
      updateStartTime(Date.now());
      interval = setInterval(() => {
        updateStartTime(Date.now());
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isGameActive, updateStartTime, updateCurrentTime]);

  const duration = intervalToDuration({
    start: new Date(startTime),
    end: new Date(currentTime),
  });

  const ms = (startTime - currentTime) % 1000;
  const { minutes = 0, seconds = 0 } = duration;

  const formattedDurationProps = isGameActive
    ? { minutes, seconds, ms }
    : finalTimerTime;

  return (
    <p className='text-lg mx-6'>
      <FormattedDuration {...formattedDurationProps} />
    </p>
  );
}

function FormattedDuration({ minutes, seconds, ms }: ITimer) {
  const formatter = new Intl.NumberFormat('en', { minimumIntegerDigits: 2 });

  return (
    <span>
      {formatter.format(minutes)}:{formatter.format(seconds)}:
      {formatter.format(ms)}
    </span>
  );
}

export default Timer;
