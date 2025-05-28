'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Account, User_Info } from '@/types/user';
import apiCall from '../../base-api/api';
import { decodeToken } from '@/lib/utils'; 

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const Url = {
  login: `${BASE_URL}/auth/google`,
};

export const googleAuthCallback = async (blogId?: string) => {
  const callbackUrl = blogId
    ? `${process.env.GOOGLE_CALLBACK_URL}/${blogId}`
    : process.env.GOOGLE_CALLBACK_URL;

  redirect(callbackUrl ?? '/api/auth/google');
};

export const handleAuthCallback = async (token: string, blogId?: string) => {
  try {
    const userData = decodeToken(token);

    if (!userData) {
      console.error('Token decode failed');
      return redirect('/login?error=invalid_token');
    }


    const cookieStore = await cookies();

    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    const userInfo: User_Info = {
      userName: userData.name || userData.email || '',
      roleId: userData.role?.id || null,
      role: userData.role?.name || null,
      imageUrl: userData.imageUrl || null,
      userId: userData.userId || null,
      token: token,
    };

    cookieStore.set('user-profile', JSON.stringify(userInfo), {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    const role = Array.isArray(userData.roles)
      ? userData.roles[0]?.toUpperCase()
      : userData.roles?.toUpperCase();
    console.log('userData.roles', userData.roles)
    if (role === 'USER') {
      if (!blogId) return redirect('/login?error=missing_blog_id');
      return redirect(`/user/blogs/${blogId}`);
    } else if (role === 'OWNER') {
      return redirect('/admin');
    } else {
      return redirect('/');
    }
  } catch (error) {
    console.error('Authentication failed:', error);
    return redirect('/login?error=auth_failed');
  }
};

export const apiUrl = async () => {
  return process.env.API_URL;
};

export const userProfile = async () => {
  const cookieStore = await cookies();
  const userProfile = cookieStore.get('user-profile')?.value;
  const user: Account = userProfile ? JSON.parse(userProfile) : null;
  return user;
};

export const userToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  return token;
};
export const Login = async () => {
  const response = await apiCall({ url: Url.login, tag: 'login' });
  const data = response;
  return data;
};

export async function logoutAction() {
  const cookieStore = cookies();
  (await cookieStore).delete('user-profile');
  (await cookieStore).delete('auth-token');
}
