import getAllLeaderboardEntries from '@/app/helpers/getAllLeaderboardEntries';
import { NextResponse } from 'next/server';
export const revalidate = 5;

export async function GET() {
  try {
    const entries = await getAllLeaderboardEntries();

    return NextResponse.json(entries);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
