import { intervalToDuration, Duration } from 'date-fns';

function padZero(num: number): string {
  return num.toString().padStart(2, '0');
}

interface IExtendedDuration extends Duration {
  ms: number;
}

interface ITimerProps {
  timeTaken: number | Date;
}

function Timer({ timeTaken }: ITimerProps): JSX.Element {
  const timeTakenMs =
    typeof timeTaken === 'number' ? timeTaken : timeTaken.getTime();
  const duration: IExtendedDuration = {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    ms: 0, // Initialize ms property
  };

  const calculatedDuration = intervalToDuration({ start: 0, end: timeTakenMs });
  duration.years = calculatedDuration.years;
  duration.months = calculatedDuration.months;
  duration.days = calculatedDuration.days;
  duration.hours = calculatedDuration.hours;
  duration.minutes = calculatedDuration.minutes;
  duration.seconds = calculatedDuration.seconds;

  // Manually add ms since duration doesn't give it
  duration.ms = Math.round((timeTakenMs % 1000) / 10);

  let formattedTimer = '';
  // Pad all times with a zero
  Object.keys(duration).forEach((timeUnit) => {
    (duration as any)[timeUnit] = padZero((duration as any)[timeUnit]);

    if (
      (duration as any)[timeUnit] !== '00' &&
      !['minutes', 'seconds', 'ms'].includes(timeUnit)
    )
      formattedTimer += `${(duration as any)[timeUnit]}:`;
  });

  formattedTimer += `${duration.minutes}:${duration.seconds}:${duration.ms}`;

  return (
    <p className='font-bold font-mono text-2xl text-info'>{formattedTimer}</p>
  );
}

export default Timer;
