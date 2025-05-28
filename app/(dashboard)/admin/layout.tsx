'use client';

import { AdminLayout } from '@/components/shared/layout/admin-layout';
import { Toaster } from '@/components/ui/toaster';
import { LayoutProps } from '@/types/admin';
import { usePathname } from 'next/navigation';
import React from 'react';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();

  // List of pages to exclude from this layout
  const excludedRoutes = ['/admin/get-started'];

  if (!pathname || excludedRoutes.includes(pathname)) {
    return <>{children}</>; // Render without the layout
  }

  // Get the last segment of the URL safely
  const lastSegment = pathname.split('/').filter(Boolean).pop() ?? 'Dashboard';

  return (
    <AdminLayout title={lastSegment.toLocaleUpperCase()}>
      <div className="w-full bg-secondary p-0 dark:bg-gray-900">
        <div className="flex mx-auto">{children}</div>
        <Toaster />
      </div>
    </AdminLayout>
  );
};

export default Layout;
