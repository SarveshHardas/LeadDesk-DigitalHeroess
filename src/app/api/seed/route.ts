import { NextResponse } from 'next/server';
import { seedLeadsAction } from '@/actions/seed.actions';

export async function POST() {
  const res = await seedLeadsAction();
  return NextResponse.json(res, { status: res.success ? 200 : 500 });
}
