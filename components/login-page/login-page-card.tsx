'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LoginPageCard = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams?.get('token');
    const blogId = sessionStorage.getItem('currentBlogId');

    if (token) {
      // Redirect to API route to handle server-side auth
      const query = new URLSearchParams({ token });
      if (blogId) query.set('state', blogId);
      router.push(`/api/auth/callback?${query.toString()}`);
    }
  }, [searchParams, router]);

  const handleLogin = () => {
    const backendUrl = process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL;
    if (!backendUrl) {
      console.error('API base URL not configured');
      return;
    }

    const blogId = sessionStorage.getItem('currentBlogId');
    window.location.href = `${backendUrl}${
      blogId ? `?state=${encodeURIComponent(blogId)}` : ''
    }`;
  };

  return (
    <Card className="flex-1 flex items-center justify-center flex-col gap-6">
      <CardHeader className="flex flex-col items-center pb-0">
        <CardTitle className="font-bold text-3xl tracking-[-1px] mb-[-5px]">
          Login
        </CardTitle>
        <CardDescription className="text-slate-500 font-normal text-base">
          Login with your Google account to proceed
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 pt-0">
        <Button
          className="w-96 h-10 font-medium text-sm"
          variant="default"
          onClick={handleLogin}
        >
          Login with Google
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoginPageCard;
