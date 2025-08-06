import type React from 'react';
export interface LayoutProps {
  children: React.ReactNode;
}

export interface User {
  userId?: string;
  id: string | number;
  name?: string;
  fullname?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  imageUrl?: string;
  joinedDate?: string;
  location?: string;
  avatar?: string;
  date?: string;
  accounts?: Account[];
  sub?: string;
  roleId?: string;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  Role?: {
    id: string;
    name: string;
    isDefault: boolean;
    type: string;
    deletedAt?: string | null;
    createdAt?: string;
    updatedAt?: string;
  };
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
  email: string;
  sub: string | null;
  name: string;
  imageUrl: string | null;
  token: string | null;
  role: string;
}

export type AccountInfo = {
  id: string;
  name: string;
  role: string | null;
};

export type SortField = 'name' | 'email' | 'joinedDate' | 'location';
