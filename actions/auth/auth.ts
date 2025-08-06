'use server';

import type { User_Info } from '@/types/user';
import { cookies } from 'next/headers';
import { decodeToken } from '@/lib/utils';

export async function setAuthCookie(userData: User_Info) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: 'auth-token',
    value: userData.token ?? '',
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
    sameSite: 'lax',
  });

  cookieStore.set({
    name: 'user-profile',
    value: JSON.stringify({
      id: userData.sub,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      imageUrl: userData.imageUrl,
    }),
    maxAge: 60 * 60 * 24,
    path: '/',
    sameSite: 'lax',
  });
}

export async function googleAuthCallback(token: string) {
  const decoded = decodeToken(token) as User_Info | null;
  console.log("Decoded token:", decoded);
  if (!decoded) {
    return { success: false };
  }

  await setAuthCookie({
    email: decoded.email || '',
    sub: decoded.sub || null,
    name: decoded.name || 'Guest',
    imageUrl: decoded.imageUrl || null,
    token,
    role: decoded.role || 'null', 
  });
 console.log("User profile set in cookies:", decoded.role);
  return { success: true };
 
}

export async function removeUserProfile() {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
  cookieStore.delete('user-profile');
}
