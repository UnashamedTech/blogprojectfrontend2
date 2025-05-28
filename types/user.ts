export interface LayoutProps {
  children: React.ReactNode;
}
export interface User {
  userId?: string;
  id: string | number;
  name?: string;
  fullname?: string;
  email?: string;
  phoneNumber?: string;
  imageUrl?: string;
  joinedDate?: string;
  location?: string;
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

export interface User_Info {
  userId: string | null;
  userName: string | null;
  roleId: string | null; 
  role: string | null;   
  imageUrl: string | null;
  token: string | null;
}


export type SortField = 'name' | 'email' | 'joinedDate' | 'location';
