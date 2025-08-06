'use server';

import LoginPageCard from '@/components/login-page/login-page-card';
import { User_Info } from '@/types/user';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


const LoginPage = async () => {
  const cookieStore = cookies();
  const userProfile = (await cookieStore).get('user-profile')?.value;
  const user: User_Info | null = userProfile ? JSON.parse(userProfile) : null;

  if (user) {
    const role =user.role;

if (role === 'OWNER') {
    redirect('/admin');
  } else if (role === 'USER') {
    redirect('/user/blogs');
  } else {
    redirect('/log-in');
  }
  }

  return (
    <div className="w-screen h-screen flex">
      <LoginPageCard />
    </div>
  );
};

export default LoginPage;
