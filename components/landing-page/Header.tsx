'use client';

import Link from 'next/link';
import { useState, useRef, useEffect, useCallback } from 'react';
import { LuLogOut } from 'react-icons/lu';
import { LayoutDashboard } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { userProfile } from '@/actions/auth/login';
import { fetchAdminProfile } from '@/actions/shared/user-profile';
import { toast } from 'sonner';
import { useClickOutside } from '@/hooks/useClickOutside';
import LoginPageCard from '@/components/login-page/login-page-card';
import type { Account } from '@/types/user';


const Header = () => {
  const [showLoginCard, setShowLoginCard] = useState(false);
  const [clientUser, setClientUser] = useState<Account | null>(null);
  const [profileData, setProfileData] = useState<Account | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const loginCardRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(loginCardRef, () => setShowLoginCard(false));
  useClickOutside(dropdownRef, () => setDropdownOpen(false));

  const logOut = async () => {
    const { removeUserProfile } = await import('@/actions/auth/auth');
    await removeUserProfile();
    window.location.href = '/log-in';
  };

  const goToAdminDashboard = () => {
    window.location.href = '/admin';
  };

  useEffect(() => {
    const fetchClientUser = async () => {
      try {
        const account = await userProfile();
        setClientUser(account);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch user session.');
        setClientUser(null);
      }
    };
    fetchClientUser();
  }, []);

const profile = useCallback(async () => {
  if (!clientUser || !clientUser.id) return;

  try {

    let res;
    if (clientUser.role === 'OWNER') {
      res = await fetchAdminProfile(clientUser.id);
    } else {
      res = await userProfile();
    }

    console.log('Profile response:', res);

    if (res.error) {
      toast.error(res.error.description);
      return;
    }

    setProfileData(res);
  } catch (error) {
    console.error('Error fetching profile:', error);
    toast.error('Failed to fetch profile data.');
  }
}, [clientUser]);

  useEffect(() => {
    if (clientUser) {
      profile();
    }
  }, [clientUser, profile]);

  const isOwner = clientUser?.role === 'OWNER';

  return (
    <header className="w-full py-6 px-12 flex items-center justify-between absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/40 via-black/40 to-transparent shadow-lg">
      <Link href="/" className="text-white text-2xl md:text-4xl font-['EBGaramond']">
        Sebsibe Elias
      </Link>

      <div className="flex-1 flex justify-center">
        <nav className="hidden md:flex items-center space-x-12">
          <Link href="/" className="text-white border-b-2 border-transparent hover:border-white pb-1 transition-all duration-200 font-['EBGaramond']">Home</Link>
          <Link href="/user/about" className="text-white border-b-2 border-transparent hover:border-white pb-1 transition-all duration-200 font-['EBGaramond']">About</Link>
          <Link href="/user/blogs" className="text-white border-b-2 border-transparent hover:border-white pb-1 transition-all duration-200 font-['EBGaramond']">Blogs</Link>
          <Link href="/user/support" className="text-white border-b-2 border-transparent hover:border-white pb-1 transition-all duration-200 font-['EBGaramond']">Support</Link>
          <Link href="/user/contact" className="text-white border-b-2 border-transparent hover:border-white pb-1 transition-all duration-200 font-['EBGaramond']">Contact</Link>
        </nav>
      </div>

      <div className="ml-4 relative">
        {profileData ? (
          <div ref={dropdownRef}>
            <Avatar className="w-8 h-8 cursor-pointer" onClick={() => setDropdownOpen((prev) => !prev)}>
              <AvatarImage src={profileData.imageUrl || '/images/placeholder.jpg'} className="w-full h-full object-cover" />
              <AvatarFallback className="w-full h-full flex items-center justify-center text-xl">
                {profileData.name?.slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-md bg-white shadow-lg z-50">
                <div className="px-4 py-3 border-b">
                  <p className="text-sm font-medium text-gray-900">{profileData.name}</p>
                  <p className="text-sm text-gray-500">{profileData.email}</p>
                </div>
                <div className="flex flex-col py-1">
                  {isOwner && (
                    <button
                      onClick={goToAdminDashboard}
                      className="flex gap-2 items-center text-sm px-4 py-2 hover:bg-gray-100 text-left"
                    >
                      <LayoutDashboard size={18} /> Admin Dashboard
                    </button>
                  )}
                  <button
                    onClick={logOut}
                    className="flex gap-2 items-center text-sm px-4 py-2 hover:bg-gray-100 text-left"
                  >
                    <LuLogOut size={18} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div ref={loginCardRef}>
            <button
              onClick={() => setShowLoginCard((prev) => !prev)}
              className="bg-white text-black rounded-md px-4 py-2 text-sm font-semibold shadow hover:bg-gray-200 transition duration-200"
            >
              Sign In
            </button>
            {showLoginCard && <LoginPageCard />}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;