import LoginPageCard from '@/components/login-page/login-page-card';
import { User_Info } from '@/types/user';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import logInbg from '@/public/images/logInbg.png';
const LoginPage = async () => {
  const cookieStore = await cookies();
  const userProfile = cookieStore.get('user-profile')?.value;

  const user: User_Info | null = userProfile ? JSON.parse(userProfile) : null;

  if (user) {
    switch (user.role) {
      case 'OWNER':
        redirect('/admin');
        break;
      case 'USER':
        redirect('/user');
        break;
      default:
        redirect('/log-in');
        break;
    }
  }

  return (
    <div className="w-full flex h-dvh">
      <LoginPageCard />
      <div className="h-full">
        <Image src={logInbg} alt="Log in Background" className="h-dvh w-auto" />
      </div>
    </div>
  );
};

export default LoginPage;
