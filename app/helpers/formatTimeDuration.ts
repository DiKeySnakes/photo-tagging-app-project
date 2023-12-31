import { formatDuration, intervalToDuration } from 'date-fns';

// Pads leading zero
const zeroPad = (num: number): string => num.toString().padStart(2, '0');

function toTimeUnitAbbreviation(duration: string): string {
  return duration
    .replace(/ seconds| second/, 's')
    .replace(/ minutes| minute/, 'm')
    .replace(/ hours| hour/, 'h')
    .replace(/ days| day/, 'd')
    .replace(/ months| month/, 'mo')
    .replace(/ years| year/, 'y');
}

function filterZeroUnits(
  duration: Record<string, number>,
  ...excludedUnits: string[]
): Record<string, number> {
  const filteredDuration: Record<string, number> = { ...duration };
  Object.keys(filteredDuration).forEach((unit) => {
    if (excludedUnits.includes(unit)) return;
    if (filteredDuration[unit] === 0) delete filteredDuration[unit];
  });
  return filteredDuration;
}

function getNumber(num: string): string {
  // Replace all non-digit characters
  return num.replace(/\D/g, '');
}

function findDurationIndexByTimeUnit(
  durations: string[],
  timeUnit: string
): number {
  return durations.findIndex((time) => {
    const unit = time.slice(-1);
    return unit === timeUnit;
  });
}

function padTimeUnitWithZero(time: string, timeUnit: string): string {
  const durations = time.split(' ');
  const durationIndex = findDurationIndexByTimeUnit(durations, timeUnit);
  // remove time unit to get raw number and then pad with leading zero
  const zeroPaddedDuration = zeroPad(
    parseInt(getNumber(durations[durationIndex]), 10)
  );
  // re-add time unit
  durations[durationIndex] = `${zeroPaddedDuration}${timeUnit}`;
  return durations.join(' ');
}

export default function formatTimeDuration(timeTaken: number | Date): string {
  if (timeTaken === 0) return '0ms';

  let duration = filterZeroUnits(
    intervalToDuration({
      start: 0,
      end:
        timeTaken instanceof Date ? timeTaken.getTime() : (timeTaken as number),
    }),
    'minutes',
    'seconds'
  );
  // delete all zero units except excluded (minutes and seconds)
  duration = filterZeroUnits(duration, 'minutes', 'seconds');

  let formattedDuration = formatDuration(duration, { zero: true });
  // abbreviate time units
  formattedDuration = toTimeUnitAbbreviation(formattedDuration);
  // pad second(s) with a leading zero. e.g.: 5s becomes 05s
  formattedDuration = padTimeUnitWithZero(formattedDuration, 's');
  // formatDuration doesn't add milliseconds, so we add it manually
  const ms = typeof timeTaken === 'number' ? timeTaken % 1000 : 0;
  if (ms !== 0) formattedDuration += ` ${ms}ms`;
  return formattedDuration;
}
