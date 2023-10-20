import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getCharacterCoordinates(characterId: string) {
  try {
    // Use Prisma to query the character and its associated coordinates
    const character = await prisma.character.findUnique({
      where: {
        id: characterId,
      },
      include: {
        coordinates: true,
      },
    });

    if (!character) {
      console.log('Character not found');
      return null;
    }

    const { coordinates } = character;

    // Return the coordinates
    return coordinates;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect(); // Disconnect from the database
  }
}

export default getCharacterCoordinates;
