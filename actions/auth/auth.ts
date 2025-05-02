'use server';

import { User_Info } from '@/types/user';
import { cookies } from 'next/headers';

export async function setAuthCookie(userData: User_Info) {
  const cookieStore = await cookies();

  // Set auth token cookie (httpOnly for security)
  cookieStore.set({
    name: 'auth-token',
    value: userData.token as string,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
    sameSite: 'lax',
  });

  // Set user profile cookie (non-sensitive data)
  cookieStore.set({
    name: 'user-profile',
    value: JSON.stringify({
      id: userData.accountId,
      name: userData.userName,
      role: userData.role,
      imageUrl: userData.imageUrl,
      userId: userData.userId,
    }),
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
    sameSite: 'lax',
  });
}

export async function removeAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
  cookieStore.delete('user-profile');
}

export async function getAuthUser(): Promise<User_Info | null> {
  const cookieStore = await cookies();
  const userProfile = cookieStore.get('user-profile')?.value;
  const token = cookieStore.get('auth-token')?.value;

  if (!userProfile || !token) {
    return null;
  }

  try {
    return JSON.parse(userProfile) as User_Info;
  } catch (error) {
    return null;
  }
}