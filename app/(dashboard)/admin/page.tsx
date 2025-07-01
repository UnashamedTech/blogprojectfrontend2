'use client';

import { useEffect, useState } from 'react';
import AdminView from '@/components/views/admin/dashboard';
import LoginPageCard from '@/components/login-page/login-page-card';
import { getCookie } from 'cookies-next';
import { setAuthCookie } from '@/actions/auth/auth';
import { useSearchParams } from 'next/navigation';

import { Suspense } from 'react';

function AdminPageContent() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const checkAuthorization = () => {
      const userProfileCookie = getCookie('user-profile') as string | undefined;
      if (!userProfileCookie) {
        setAuthorized(false);
        return;
      }

      try {
        const profile = JSON.parse(userProfileCookie);
        if (profile.role === 'OWNER') {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (err) {
        console.error('Failed to parse user profile:', err);
        setAuthorized(false);
      }
    };

    const initialize = async () => {
      const tokenFromUrl = searchParams?.get('token');

      if (tokenFromUrl) {
        setToken(tokenFromUrl);

        const response = await setAuthCookie(tokenFromUrl);

        if (response === true) {
          checkAuthorization();
        } else {
          setAuthorized(false);
        }
      } else {
        checkAuthorization();
      }
    };

    initialize();
  }, [searchParams]);

  if (authorized === null) return <div>Loading...</div>;

  if (!authorized) {
    return (
      <div className="w-full p-8 flex justify-center">
        <div className="max-w-md w-full">
          <LoginPageCard />
        </div>
      </div>
    );
  }

  console.log(token);

  return <AdminView />;
}

function AdminPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminPageContent />
    </Suspense>
  );
}

export default AdminPage;
