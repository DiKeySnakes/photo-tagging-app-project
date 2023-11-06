import React from 'react';
import { format, formatDistanceToNowStrict } from 'date-fns';
import formatTimeDuration from '../helpers/formatTimeDuration';

interface ILeaderboardSubmissionProps {
  id: string;
  name: string;
  place: number;
  timeTaken: Date | number;
  dateSubmitted: Date | number;
}

function getNumberWithOrdinal(number: number) {
  const ordinals = ['th', 'st', 'nd', 'rd'];
  const tens = number % 100;
  return number + (ordinals[(tens - 20) % 10] || ordinals[tens] || ordinals[0]);
}

const LeaderboardSubmission: React.FC<ILeaderboardSubmissionProps> = ({
  place,
  name,
  timeTaken,
  dateSubmitted,
}) => {
  const dateSubmittedDate = new Date(dateSubmitted);
  const formattedDate = format(dateSubmittedDate, 'MMM d, y');
  const distanceToNow = formatDistanceToNowStrict(dateSubmittedDate, {
    addSuffix: true,
  });

  return (
    <tr className='border-[1px] border-solid'>
      <td className='px-4 py-5 text-2xl font-semibold'>
        {getNumberWithOrdinal(place)}
      </td>
      <td className='px-4 py-5 text-2xl font-semibold'>
        <span className='submission-name-text'>{name}</span>
      </td>
      <td className='px-4 py-5 text-2xl font-semibold'>
        {formatTimeDuration(timeTaken)}
      </td>
      <td className='px-4 py-5 text-2xl font-semibold' title={distanceToNow}>
        {formattedDate}
      </td>
    </tr>
  );
};

export default LeaderboardSubmission;
