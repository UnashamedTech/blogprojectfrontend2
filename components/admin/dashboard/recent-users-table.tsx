'use client';
import type React from 'react';
import { useEffect, useState } from 'react';
import DataTable from '@/components/admin/data-table';
import UserDetailsModal from '@/components/admin/user-details-modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Column } from '@/types/data-table';
import { toast } from 'sonner';
import { endPoints } from '@/data/end-points';
import { deleteUser } from '@/actions/admin/admin';
import type { Account, User } from '@/types/user';
import { userProfile } from '@/actions/auth/login';

const columns: Column<User>[] = [
  {
    key: 'name',
    header: 'Users',
    render: (user: User) => {
      const displayName = user.name || user.fullname || 'Unknown User';
      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            {user.imageUrl && (
              <AvatarImage
                src={user.imageUrl || '/placeholder.svg?height=32&width=32'}
                alt={displayName}
              />
            )}
            <AvatarFallback>
              {displayName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {displayName}
        </div>
      );
    },
  },
  { key: 'email', header: 'Email' },
  {
    key: 'joinedDate',
    header: 'Joined Date',
    render: (user: User) =>
      user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-',
  },
];

const searchFields: (keyof User)[] = ['name', 'email', 'location'];

const RecentUsers: React.FC = () => {
  const [clientUser, setClientUser] = useState<Account | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [triggerState, setTriggerState] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);

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

  const handleView = (user: User) => {
    setSelectedUser(user);
    setUserDetailsOpen(true);
  };

  return (
    <div className="flex-1 bg-secondary dark:bg-gray-900 w-full">
      <div className="space-y-6 bg-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Recent Users</h1>
        </div>
        {clientUser && (
          <DataTable<User>
            tag="recent-users"
            apiUrl={endPoint}
            columns={columns}
            searchFields={searchFields}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onDelete={handleDelete}
            onView={handleView}
            actionConfig={{
              view: true,
              edit: false,
              delete: true,
            }}
            triggerState={triggerState as boolean}
            setTriggerState={
              setTriggerState as React.Dispatch<React.SetStateAction<boolean>>
            }
          />
        )}

        <UserDetailsModal
          user={selectedUser}
          open={userDetailsOpen}
          onOpenChange={setUserDetailsOpen}
        />
      </div>
    </div>
  );
};

export default RecentUsers;
