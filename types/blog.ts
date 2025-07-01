import type React from 'react';
export interface LayoutProps {
  children: React.ReactNode;
}

export interface Blogs {
  id: string | number;
  Title?: string;
  Category?: string;
  location?: string;
  CreatedDate?: string;
  Comments?: string;
  Likes?: string;
  CommentsAndLikes?: string | number;
}

export type SortField =
  | 'Title'
  | 'Category'
  | 'CreatedDate'
  | 'location'
  | 'Comments'
  | 'Likes';
