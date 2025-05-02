'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Account, User_Info } from '@/types/user';
import apiCall from '../../base-api/api';

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
  const cookieStore = await cookies();
  
  try {
    // Verify token with your backend
    const userData = await verifyTokenWithBackend(token);
    
    // Set auth cookies
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    const userInfo: User_Info = {
      userName: userData.name || userData.email || '',
      accountId: userData.id,
      roleId: userData.role?.id || null,
      role: userData.role?.name || null,
      imageUrl: userData.imageUrl || null,
      userId: userData.userId || null,
      token: token
    };

    cookieStore.set('user-profile', JSON.stringify(userInfo), {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    // Redirect to blog if blogId exists
    if (blogId) {
      redirect(`/user/blogs/${blogId}`);
    }
    return redirect('/');
    
  } catch (error) {
    console.error('Authentication failed:', error);
    redirect('/login?error=auth_failed');
  }
};

async function verifyTokenWithBackend(token: string) {
  // Implement your actual token verification with backend
  const response = await apiCall({ 
    url: '/auth/verify',
    method: 'POST',
    data: { token },
    tag: 'verify-token'
  });
  return response;
}

// ... keep your other existing functions
export const apiUrl = async () => {
  return process.env.API_URL;
};
export const userProfile = async () => {
  const cookieStore = await cookies();
  const userProfile = cookieStore.get('user-profile')?.value;
  const user: Account = userProfile && JSON.parse(userProfile);
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
