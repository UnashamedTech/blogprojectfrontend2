'use server';
import { LayoutProps } from '@/types/user';

const DashboardLayout: React.FC<LayoutProps> = async ({ children }) => {
  return <div>{children}</div>;
};

export default DashboardLayout;
