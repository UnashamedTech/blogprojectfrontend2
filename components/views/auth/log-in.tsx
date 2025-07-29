import LoginPageCard from '@/components/login-page/login-page-card';
import { User_Info } from '@/types/user';
import { cookies } from 'next/headers';

const LoginPage = async () => {
  const cookieStore = cookies();
  const userProfile = (await cookieStore).get('user-profile')?.value;
  const user: User_Info | null = userProfile ? JSON.parse(userProfile) : null;

  if (user) {
    const role = user.roles?.[0]?.toUpperCase();

    if (typeof window !== 'undefined') {
      if (role === 'OWNER') {
        window.location.href = '/admin';
      } else if (role === 'USER') {
        window.location.href = '/user/blogs';
      } else {
        window.location.href = '/log-in';
      }
      return null;
    }
  }

  return (
    <div className="w-screen h-screen flex">
      <LoginPageCard />
    </div>
  );
};

export default LoginPage;
