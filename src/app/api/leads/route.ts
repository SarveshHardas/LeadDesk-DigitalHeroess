import { NextRequest, NextResponse } from 'next/server';
import { getLeadsAction, submitLeadAction } from '@/actions/lead.actions';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('search') || undefined;
  const status = searchParams.get('status') || undefined;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  const res = await getLeadsAction({ search, status, page, limit });
  return NextResponse.json(res, { status: res.success ? 200 : 500 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await submitLeadAction(body);
    return NextResponse.json(res, { status: res.success ? 201 : 400 });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON request payload' },
      { status: 400 }
    );
  }
}
