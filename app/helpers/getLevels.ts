import { PrismaClient } from '@prisma/client';
import { ILevel } from '../components/GameLevel';

const prisma = new PrismaClient();

async function getLevels(): Promise<ILevel[]> {
  try {
    const levels = await prisma.level.findMany({
      include: {
        characters: true,
        leaderboard: true,
      },
    });
    return levels;
  } catch (error) {
    if (error instanceof Error) {
      // Check if it's an Error object
      throw new Error(`Error fetching levels: ${error.message}`);
    } else {
      throw new Error(`Unknown error occurred`);
    }
  } finally {
    await prisma.$disconnect();
  }
}

export default getLevels;
