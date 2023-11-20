import getCharacterCoordinates from '@/app/helpers/getCharacterCoordinates';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { characterId: string } }
) {
  // Access characterId from params
  const characterId = params?.characterId;

  if (!characterId) {
    return new NextResponse('Character ID not provided', { status: 400 });
  }

  try {
    const coordinates = await getCharacterCoordinates(characterId);

    if (coordinates) {
      return new NextResponse(JSON.stringify(coordinates), {
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new NextResponse('Character not found', { status: 404 });
    }
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
