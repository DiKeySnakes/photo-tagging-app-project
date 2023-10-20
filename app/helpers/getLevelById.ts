import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class LevelNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LevelNotFoundError';
  }
}

async function getLevelById(levelId: string) {
  try {
    const level = await prisma.level.findUnique({
      where: {
        id: levelId,
      },
      include: {
        characters: true,
        leaderboard: false,
        game: false,
      },
    });

    if (!level) {
      throw new LevelNotFoundError('No level found');
    }

    return level;
  } catch (error) {
    throw new Error(`Error getting the level by ID: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
}

export default getLevelById;
