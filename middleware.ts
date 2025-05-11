import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { logoutAction } from './actions/auth/login';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('auth-token')?.value;
  const userProfile = req.cookies.get('user-profile')?.value;

  // Check for expired token
  if (token && userProfile) {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);

      if (decoded.exp < now) {
        await logoutAction();
        return NextResponse.redirect(new URL('/log-in', req.url));
      }
    } catch (error) {
      await logoutAction();
      return NextResponse.redirect(new URL('/log-in', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/user/:path*', '/admin/:path*'], // Protect these routes
};
