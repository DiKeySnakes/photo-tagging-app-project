import { PrismaClient, LeaderboardEntry } from '@prisma/client';

const prisma = new PrismaClient();

async function createLeaderboardEntry(
  levelId: string,
  name: string,
  timeTaken: Date,
  dateSubmitted: Date
): Promise<LeaderboardEntry> {
  try {
    const leaderboardEntry = await prisma.leaderboardEntry.create({
      data: {
        name: name,
        timeTaken: timeTaken,
        dateSubmitted: dateSubmitted,
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
