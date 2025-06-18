import type React from 'react';
export interface LayoutProps {
  children: React.ReactNode;
}

export interface Categories {
    id: string | number;
 CategoryName?: string;
  Description?: string;
  CreatedDate?: string;
}

export type SortField = 'CategoryName' | 'Description' | 'CreatedDate' ;