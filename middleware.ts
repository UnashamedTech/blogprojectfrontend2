import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { logoutAction } from './actions/auth/login';

export async function middleware(req: NextRequest) {
  const tokenFromCookie = req.cookies.get('auth-token')?.value;
  const tokenFromUrl = req.nextUrl.searchParams.get('token');

  const pathname = req.nextUrl.pathname;
  const adminPath = '/admin';
  const userPath = '/user/blogs';

  if (tokenFromUrl) {
    return NextResponse.next();
  }

  if (tokenFromCookie) {
    try {
      const decoded = JSON.parse(atob(tokenFromCookie.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);

      if (decoded.exp < now) {
        await logoutAction();
        return NextResponse.redirect(new URL('/log-in', req.url));
      }

      const role = decoded.role?.toUpperCase();

      if (pathname.startsWith(adminPath) && role === 'USER') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    } catch (err) {
      console.error('Invalid JWT:', err);
      await logoutAction();
      return NextResponse.redirect(new URL('/log-in', req.url));
    }
  }

  const isProtectedRoute =
    pathname.startsWith(adminPath) || pathname.startsWith(userPath);

  if (isProtectedRoute && !tokenFromCookie) {
    return NextResponse.redirect(new URL('/log-in', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/user/blogs/:path*', '/admin/:path*'],
};
