import createLeaderboardEntry from '@/app/helpers/createLeaderboardEntry';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { levelId, name, timeTaken } = body;
    const leaderboard = await createLeaderboardEntry(levelId, name, timeTaken);

    return NextResponse.json(leaderboard);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
