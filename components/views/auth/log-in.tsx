import LoginPageCard from '@/components/login-page/login-page-card';
import { User_Info } from '@/types/user';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
    <div className="w-screen h-screen flex">
      <LoginPageCard />
    </div>
  );
};

export default LoginPage;
