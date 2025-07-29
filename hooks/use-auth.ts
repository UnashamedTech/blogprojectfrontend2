'use client';

import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { useSearchParams } from 'next/navigation';
import { setAuthCookie } from '@/actions/auth/auth';
import { User_Info, Account } from '@/types/user';
import { userProfile } from '@/actions/auth/login';

export function useAuth() {
  const [user, setUser] = useState<User_Info | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only fetch user info for display, not for auth state
    (async () => {
      try {
        const accountData = await userProfile();
        if (accountData) {
          const userInfo: User_Info = {
            userName: accountData.name || accountData.email || '',
            roleId: accountData.role?.id || null,
            role: accountData.role?.name || null,
            imageUrl: accountData.imageUrl || null,
            userId: accountData.userId || null,
            token: null,
          };
          setUser(userInfo);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { user, loading };
}
