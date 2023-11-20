import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface LeaderboardEntry {
  id: string;
  name: string;
  timeTaken: number;
  createdAt: Date;
  levelId: string;
}

interface LevelWithLeaderboard {
  id: string;
  name: string;
  leaderboard: LeaderboardEntry[];
}

async function getAllLeaderboardEntries(): Promise<LeaderboardEntry[]> {
  try {
    const levels: LevelWithLeaderboard[] = await prisma.level.findMany({
      include: {
        leaderboard: true,
      },
    });

    const leaderboardEntries: LeaderboardEntry[] = levels.flatMap(
      (level) => level.leaderboard
    );

    return leaderboardEntries;
  } finally {
    await prisma.$disconnect();
  }
}

export default getAllLeaderboardEntries;
