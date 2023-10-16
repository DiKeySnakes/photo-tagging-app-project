import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  const allLevels = await prisma.level.findMany();
  console.log(allLevels);
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

async function populateDatabase() {
  // Create a new game
  const newGame = await prisma.game.create({
    data: {
      name: 'My Game',
      levels: {
        create: [
          {
            name: 'Level 1',
            image: 'level1.jpg',
            characters: {
              create: [
                {
                  name: 'Character 1',
                  image: 'character1.jpg',
                  found: false,
                  coordinates: {
                    create: {
                      x: 100,
                      y: 200,
                    },
                  },
                },
                // Add more characters for this level
              ],
            },
            leaderboard: {
              create: [
                {
                  name: 'Player 1',
                  timeTaken: new Date(),
                  dateSubmitted: new Date(),
                },
                // Add more leaderboard entries for this level
              ],
            },
          },
          // Add more levels for the game
        ],
      },
    },
  });

  console.log('New game created:', newGame);
}

// populateDatabase()
//   .catch((error) => {
//     console.error('Error populating the database:', error);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
