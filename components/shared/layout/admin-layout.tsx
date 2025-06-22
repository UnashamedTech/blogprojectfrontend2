import { Header } from '@/components/shared/layout/header';
import { Sidebar } from '@/components/shared/layout/sidebar';
import { Toaster } from '@/components/ui/sonner';
import React from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  return (
    <div className="flex max-h-screen">
      <Sidebar />
      <div className="flex w-full flex-1 flex-col">
        <Header title={title} />
        <main className="w-full overflow-auto">{children}</main>
        <Toaster />
      </div>
    </div>
  );
}
