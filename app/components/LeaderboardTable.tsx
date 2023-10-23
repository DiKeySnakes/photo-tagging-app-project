import LeaderboardSubmission from './LeaderboardSubmission';

interface ILeaderboardEntry {
  id: string;
  name: string;
  timeTaken: Date | number;
  createdAt: Date | number;
}

interface ILeaderboardTableProps {
  leaderboard: ILeaderboardEntry[];
}

function LeaderboardTable({ leaderboard }: ILeaderboardTableProps) {
  if (!leaderboard) {
    return <p className='no-active-level'>No level selected.</p>;
  }

  if (!leaderboard.length) {
    return <p className='no-submissions'>No submissions yet, be the first!</p>;
  }

  // Assuming you have an array of LeaderboardEntry objects
  const sortedLeaderboard = leaderboard.sort((a, b) => {
    const timeTakenA =
      typeof a.timeTaken === 'number'
        ? a.timeTaken
        : (a.timeTaken.valueOf() as number);
    const timeTakenB =
      typeof b.timeTaken === 'number'
        ? b.timeTaken
        : (b.timeTaken.valueOf() as number);
    return timeTakenA - timeTakenB;
  });

  return (
    <div className='leaderboard-table-container'>
      <table className='leaderboard-table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Time</th>
            <th scope='col'>Date</th>
          </tr>
        </thead>
        <tbody>
          {sortedLeaderboard.map((submission, index) => (
            <LeaderboardSubmission
              place={index + 1}
              id={submission.id}
              name={submission.name}
              timeTaken={submission.timeTaken}
              dateSubmitted={submission.createdAt}
              key={submission.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderboardTable;
