'use client';

import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { useSearchParams } from 'next/navigation';
import { setAuthCookie } from '@/actions/auth/auth';
import { User_Info, Account } from '@/types/user';
import { userProfile } from '@/actions/auth/login';

export function useAuth() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [user, setUser] = useState<User_Info | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const checkAuth = async () => {
    try {
      const accountData = await userProfile();
      if (!accountData) {
        throw new Error('Not authenticated');
      }
      const userInfo: User_Info = {
        userName: accountData.name || accountData.email || '',
        roleId: accountData.role?.id || null,
        role: accountData.role?.name || null,
        imageUrl: accountData.imageUrl || null,
        userId: accountData.userId || null,
        token: null,
      };
      setUser(userInfo);
      return true;
    } catch (error) {
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return { user, loading, checkAuth };
}
