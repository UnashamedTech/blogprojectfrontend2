import type React from 'react';
export interface LayoutProps {
  children: React.ReactNode;
}

export interface Categories {
  id: string | number;
  title?: string;
  description?: string;
  createdAt?: string;
}

export type SortField = 'CategoryName' | 'Description' | 'CreatedDate';
