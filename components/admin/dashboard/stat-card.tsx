import { Card, CardContent } from '@/components/ui/card';
import { FiUsers, FiBriefcase } from 'react-icons/fi';
import { ArrowUpRight } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: 'users' | 'blogs';
}

function StatsCard({ title, value, change, icon }: StatsCardProps) {
  return (
    <Card className="bg-white dark:bg-gray-950 p-4 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm  h-[175px]">
      <CardContent className="p-0 space-y-3">
        <div className="flex justify-start">
          <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            {icon === 'users' ? (
              <FiUsers className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            ) : (
              <FiBriefcase className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold">{value}</div>
          <div className="px-1.5 py-0.5 text-xs font-semibold bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400 rounded flex items-center">
            <ArrowUpRight className="h-3 w-3 mr-0.5" />
            {change}
          </div>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">{title}</div>
      </CardContent>
    </Card>
  );
}

export function StatsCards() {
  return (
    <div className="bg-white dark:bg-gray-950 p-4 rounded-lg shadow-sm max-w-xs h-[425px]">
      <div className="grid gap-4 grid-cols-1">
        <StatsCard
          title="Total Users"
          value="3,540"
          change="+25.5%"
          icon="users"
        />
        <StatsCard
          title="Total Blogs"
          value="1,150"
          change="+4.10%"
          icon="blogs"
        />
      </div>
    </div>
  );
}
