// types of user data fetched
export interface LayoutProps {
  children: React.ReactNode;
}
export interface User {
  userId?: string;
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  phone?: string;
  imageUrl?: string;
  joinedDate?: string;
  location?: string;
  platform?: string;
  avatar?: string;
  date?: string;
  accounts?: Account[];
  sub?: string;
}
export type Account = {
  id: string;
  name?: string;
  email?: string;
  role?: {
    id: string;
    name: string;
  };
  imageUrl?: string;
  userId?: string;
};

export type User_Info = {
  userName: string | null;
  accountId: string | null;
  roleId: string | null;
  role: string | null;
  token?: string | null;
  imageUrl?: string | null;
  userId?: string | null;
};

export type SortField = 'name' | 'email' | 'joinedDate' | 'location';
