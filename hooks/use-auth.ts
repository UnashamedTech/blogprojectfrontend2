'use client';

import { useEffect, useState } from 'react';
import { User_Info } from '@/types/user';
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
            name: accountData.name || accountData.email || '',
            role: accountData.role || '',
            imageUrl: accountData.imageUrl || null,
            sub: accountData.userId || null,
            token: null,
            email: '',
          };
          setUser(userInfo);
        } else {
          setUser(null);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { user, loading };
}
