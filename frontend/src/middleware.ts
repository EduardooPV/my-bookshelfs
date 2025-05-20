import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token');
  const isLoggedIn = !!token?.value;
  const pathname = request.nextUrl.pathname;

  const isDashboardRoute = pathname.startsWith('/dashboard');
  const isAuthPage = pathname.startsWith('/auth');

  if (isDashboardRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/(dashboard|auth)/:path*'],
};
