import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decryptSession } from '@/lib/session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === '/admin/login';
  const isAdminRoute = pathname.startsWith('/admin') && !isLoginPage;

  if (!isAdminRoute && !isLoginPage) {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get('leaddesk_session')?.value;
  const session = sessionToken ? await decryptSession(sessionToken) : null;

  // Protected Admin Routes: Redirect unauthenticated users to login page
  if (isAdminRoute) {
    if (!session || session.role !== 'admin') {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Login Page: Redirect already authenticated admin users straight to admin dashboard
  if (isLoginPage && session && session.role === 'admin') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
