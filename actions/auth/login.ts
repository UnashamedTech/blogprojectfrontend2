'use server';

import { cookies } from 'next/headers';
import apiCall from '../../base-api/api';
import { redirect } from 'next/navigation';
import type { Account } from '@/types/user';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Url = {
  login: `${BASE_URL}/auth/google`,
};

export const googleAuthCallbackk = async () => {
  redirect(process.env.GOOGLE_CALLBACK_URL ?? '/');
};

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
