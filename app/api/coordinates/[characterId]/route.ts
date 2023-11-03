import getCharacterCoordinates from '@/app/helpers/getCharacterCoordinates';
import { NextResponse } from 'next/server';

// interface IParams {
//   characterId?: string;
// }

// export async function GET({ params }: { params: IParams }) {
export async function GET(
  request: Request,
  { params }: { params: { characterId: string } }
) {
  const characterId = params?.characterId; // Access characterId from params

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
