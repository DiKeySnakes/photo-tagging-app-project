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
    return <p className='text-center text-2xl my-5'>No level selected.</p>;
  }

  if (!leaderboard.length) {
    return (
      <p className='text-center text-2xl my-5'>
        No submissions yet, be the first!
      </p>
    );
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
    <div className='overflow-auto'>
      <table className=' w-full text-center m-auto rounded-3xl border-collapse'>
        <thead className='border-[1px] border-solid'>
          <tr>
            <th className='px-4 py-5 text-3xl' scope='col'>
              #
            </th>
            <th className='px-4 py-5 text-3xl' scope='col'>
              Name
            </th>
            <th className='px-4 py-5 text-3xl' scope='col'>
              Time
            </th>
            <th className='px-4 py-5 text-3xl' scope='col'>
              Date
            </th>
          </tr>
        </thead>
        <tbody className='px-4 py-5 text-2xl'>
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
