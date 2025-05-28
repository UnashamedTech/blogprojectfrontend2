'use server';

import { cookies } from 'next/headers';
import { decodeToken } from '@/lib/utils';
import type { User_Info } from '@/types/user';

export async function setAuthCookie(token: string) {
  const decoded = decodeToken(token);

  if (!decoded || !decoded.roles || decoded.roles.length === 0) {
    throw new Error('Invalid token or no roles found');
  }

  const userData: User_Info = {
    userId: decoded.sub ?? null,
    userName: decoded.email ?? null,
    roleId: null,
    role: decoded.roles[0],
    imageUrl: decoded.imageUrl ?? null,
    token,
  };

  const cookieStore = await cookies();

  cookieStore.set({
    name: 'auth-token',
    value: userData.token as string,
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: '/',
    sameSite: 'lax',
  });

  cookieStore.set({
    name: 'user-profile',
    value: JSON.stringify({
      id: userData.userId,
      name: userData.userName,
      role: userData.role,
      imageUrl: userData.imageUrl,
      userId: userData.userId,
    }),
    maxAge: 60 * 60 * 24,
    path: '/',
    sameSite: 'lax',
  });

  return true;
}

export async function removeUserProfile() {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
  cookieStore.delete('user-profile');
}
