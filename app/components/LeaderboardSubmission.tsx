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
    <tr className='leaderboard-submission'>
      <td className='submission-place'>{getNumberWithOrdinal(place)}</td>
      <td className='submission-name'>
        <span className='submission-name-text'>{name}</span>
      </td>
      <td className='submission-time'>{formatTimeDuration(timeTaken)}</td>
      <td className='submission-date' title={distanceToNow}>
        {formattedDate}
      </td>
    </tr>
  );
};

export default LeaderboardSubmission;
