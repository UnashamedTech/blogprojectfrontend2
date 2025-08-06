'use client';

import { FiBell } from 'react-icons/fi';
import { LuUser, LuLogOut } from 'react-icons/lu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './accountDialog';
import { useEffect, useState } from 'react';
import type { Account } from '@/types/user';
import { userProfile } from '@/actions/auth/login';
import { fetchUserProfile } from '@/actions/shared/user-profile';
import { toast } from 'sonner';
import { useCallback } from 'react';

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
        toast.error('Failed to fetch user profile. Please try again later.');
        setClientUser(null);
      }
    };
    fetchClientUser();
  }, []);

  const profile = useCallback(async () => {
    if (!clientUser) return;

    try {
      if (!clientUser.userId || !clientUser.id) {
        throw new Error('User ID or Client ID is missing.');
      }

      const response = await fetchUserProfile(clientUser.userId, clientUser.id);
      if (response.error) {
        toast.error(response.error.description);
        throw new Error('Failed to fetch profile.');
      }

      setProfileData(response);
      toast.success('Profile fetched successfully.');
    } catch (error) {
      console.error(error);
    }
  }, [clientUser]);

  const goToProfile = () => {
    let roleName: string | undefined = undefined;
    if (typeof clientUser?.role === 'string') {
      roleName = String(clientUser.role).toUpperCase();
    } else if (clientUser?.role && typeof clientUser.role === 'object' && 'name' in clientUser.role && typeof clientUser.role.name === 'string') {
      roleName = clientUser.role.name.toUpperCase();
    }

    if (roleName === 'OWNER') {
      if (typeof window !== 'undefined') {
        window.location.href = '/admin/get-started';
      }
    } else if (roleName === 'USER') {
      if (typeof window !== 'undefined') {
        window.location.href = '/user/get-started';
      }
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
                src={profileData?.imageUrl || '/assets/avatars/woman1.png'}
                className="w-full h-full object-cover"
              />
              <AvatarFallback className="w-full h-full flex items-center justify-center text-xl">
                {profileData?.name?.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </DialogTrigger>
          <DialogContent className="rounded-[6px] pt-4 pb-0 px-0 w-min translate-x-0 translate-y-0 top-12 left-auto right-2.5 ">
            <DialogHeader className="space-y-0 px-4">
              <DialogTitle className="text-start text-lg">
                {profileData?.name}
              </DialogTitle>
              <DialogDescription className="text-base">
                {profileData?.email}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col">
              <div
                onClick={goToProfile}
                className="flex gap-2 text-lg py-2 border border-y-slate-200 border-x-0 px-4 cursor-pointer hover:bg-slate-50"
              >
                <LuUser size={25} /> Profile
              </div>
              <div
                className="flex gap-2 text-lg py-2 px-4 cursor-pointer hover:bg-slate-50"
                onClick={logOut}
              >
                <LuLogOut size={25} /> Logout
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
