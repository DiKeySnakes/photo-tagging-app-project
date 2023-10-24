import getLevels from '@/app/helpers/getLevels';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const levels = await getLevels();

    return NextResponse.json(levels);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
