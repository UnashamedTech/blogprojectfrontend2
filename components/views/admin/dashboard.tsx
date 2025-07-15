'use client';

import { useEffect, useState } from 'react';
import { StatsCards } from '@/components/admin/dashboard/stat-card';
import { CategoryChart } from '@/components/admin/dashboard/category-chart';
import { PerformanceChart } from '@/components/admin/dashboard/PerformanceChart';
import RecentUsers from '@/components/admin/dashboard/recent-users-table';
import { getCookie } from 'cookies-next';

export default function AdminView() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const cookie = getCookie('user-profile');
    if (cookie) {
      try {
        const parsedUser = JSON.parse(cookie as string);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse user cookie:', error);
      }
    }
  }, []);

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="flex flex-col items-start justify-center bg-gray-100 dark:bg-gray-900 p-8 w-full">
      <div className="flex gap-1 flex-col mb-[16px]">
        <h1 className="font-bold text-3xl">Hi {user?.name || 'Admin'}</h1>
        <p className="text-gray-500 text-[14px]">This is your Website report</p>
      </div>
      <div className="grid grid-cols-10 gap-3 w-full ">
        <div className="md:col-span-2 h-full">
          <StatsCards />
        </div>
        <div className="md:col-span-2 h-full">
          <CategoryChart />
        </div>
        <div className="md:col-span-6">
          <PerformanceChart />
        </div>
      </div>
      <div className="container w-full  mt-4">
        <RecentUsers />
      </div>
    </div>
  );
}
