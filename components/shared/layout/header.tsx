'use client';

import { FiBell } from 'react-icons/fi';
import { LuLogOut } from 'react-icons/lu';
import { LayoutDashboard } from 'lucide-react'; 
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './accountDialog';
import { useEffect, useState, useCallback } from 'react';
import type { Account } from '@/types/user';
import { userProfile } from '@/actions/auth/login';
import { fetchAdminProfile } from '@/actions/shared/user-profile';
import { toast } from 'sonner';

export function Header({ title }: { title: string }) {
  const [clientUser, setClientUser] = useState<Account | null>(null);
  const [profileData, setProfileData] = useState<Account | null>(null);

  const logOut = async () => {
    const { removeUserProfile } = await import('@/actions/auth/auth');
    await removeUserProfile();
    if (typeof window !== 'undefined') {
      window.location.href = '/log-in';
    }
  };

  useEffect(() => {
    const fetchClientUser = async () => {
      try {
        const userAccount: Account = await userProfile();
        setClientUser(userAccount);
      } catch (error) {
        console.log(error);
        toast.error('Failed to fetch admin profile. Please try again later.');
        setClientUser(null);
      }
    };
    fetchClientUser();
  }, []);

  const profile = useCallback(async () => {
    if (!clientUser) return;

    try {
      if ( !clientUser.id) {
        throw new Error('User ID or Client ID is missing.');
      }

      const response = await fetchAdminProfile( clientUser.id);
      if (response.error) {
        toast.error(response.error.description);
        throw new Error('Failed to fetch profile.');
      }

      setProfileData(response);
    } catch (error) {
      console.error(error);
    }
  }, [clientUser]);

  const goToDashboard = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  useEffect(() => {
    if (clientUser) {
      profile();
    }
  }, [clientUser, profile]);

  return (
    <header className="flex h-14 items-center justify-between border-b px-4">
      <h1 className="text-base font-normal">{title}</h1>
      <div className="flex items-center space-x-4">
        <button title="notify" className="text-gray-600 hover:text-gray-900">
          <FiBell className="h-5 w-5" />
        </button>
        <Dialog>
          <DialogTrigger>
            <Avatar className="w-8 h-8 cursor-pointer">
              <AvatarImage
                src={profileData?.imageUrl || '/images/placeholder.jpg'}
                className="w-full h-full object-cover"
              />
              <AvatarFallback className="w-full h-full flex items-center justify-center text-xl">
                {profileData?.name?.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </DialogTrigger>
          <DialogContent className="rounded-[6px] pt-4 pb-0 px-0 w-72 translate-x-0 translate-y-0 top-12 left-auto right-2.5 shadow-lg">
            <DialogHeader className="px-4 pb-2">
              <DialogTitle className="text-left text-base font-semibold">
                {profileData?.name || '[user name]'}
              </DialogTitle>
              <DialogDescription className="text-left text-sm text-muted-foreground">
                {profileData?.email || '[useremail@gmail.com]'}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col border-t">
              <div
                onClick={goToDashboard}
                className="flex gap-2 items-center text-base py-2 px-4 cursor-pointer hover:bg-slate-50"
              >
                <LayoutDashboard size={20} /> Your Dashboard
              </div>
              <div
                onClick={logOut}
                className="flex gap-2 items-center text-base py-2 px-4 cursor-pointer hover:bg-slate-50"
              >
                <LuLogOut size={20} /> Logout
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
