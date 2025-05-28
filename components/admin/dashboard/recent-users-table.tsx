'use client';
import type React from 'react';
import { useEffect, useState } from 'react';
import DataTable from '@/components/admin/data-table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Column } from '@/types/data-table';
import { toast } from 'sonner';
import { endPoints } from '@/data/end-points';
import { deleteUser } from '@/actions/admin/admin';
import type { Account, User } from '@/types/user';
import { userProfile } from '@/actions/auth/login';

const columns: Column<User>[] = [
  {
    key: 'name',
    header: 'Full Name',
    render: (recent: User) => (
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarFallback>{recent.fullname?.slice(0, 2)}</AvatarFallback>
        </Avatar>
        {recent.fullname}
      </div>
    ),
  },
  { key: 'email', header: 'Email' },
  {
    key: 'phoneNumber',
    header: 'phone Number',
    render: (recent: User) =>
      recent.phoneNumber === null ? 'null' : recent.phoneNumber,
  },
  {
    key: 'location',
    header: 'Location',
    render: (recent: User) =>
      recent.location === null ? 'null' : recent.location,
  },
  { key: 'joinedDate', header: 'joined Date' },
];

const RecentUsers: React.FC = () => {
  const [clientUser, setClientUser] = useState<Account | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [triggerState, setTriggerState] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userAccount: Account = await userProfile();
      setClientUser(userAccount);
    };
    fetchUserProfile();
  }, []);
  const endPoint = `${endPoints.allUsers}`;
  const [itemsPerPage, onItemsPerPageChange] = useState<number>(5);

  const handleDelete = async (id: string | number) => {
    try {
      const response = await deleteUser(id as string);
      if (response.error) {
        toast.error('Failed to delete the user. Please try again later.');
      }

      setTriggerState(!triggerState);
      toast.success('User Successfully deleted.');
    } catch {
      toast.error('An error occurred while deleting the user.');
    }
  };

  return (
    <div className="flex-1 p-4 bg-secondary dark:bg-gray-900">
      <div className="space-y-6 bg-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Recent Users</h1>
        </div>
        {clientUser && (
          <DataTable<User>
            tag="recent-users"
            apiUrl={endPoint}
            columns={columns}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onDelete={handleDelete}
            triggerState={triggerState as boolean}
            setTriggerState={
              setTriggerState as React.Dispatch<React.SetStateAction<boolean>>
            }
          />
        )}
      </div>
    </div>
  );
};

export default RecentUsers;
