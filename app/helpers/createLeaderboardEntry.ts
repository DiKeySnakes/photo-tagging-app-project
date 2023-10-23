import { PrismaClient, LeaderboardEntry } from '@prisma/client';

const prisma = new PrismaClient();

async function createLeaderboardEntry(
  levelId: string,
  name: string,
  timeTaken: number
): Promise<LeaderboardEntry> {
  try {
    const leaderboardEntry = await prisma.leaderboardEntry.create({
      data: {
        name: name,
        timeTaken: timeTaken,
        level: { connect: { id: levelId } },
      },
    });

    console.log('Leaderboard entry created:', leaderboardEntry);

    return leaderboardEntry;
  } catch (error) {
    console.error('Error creating leaderboard entry:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export default createLeaderboardEntry;
