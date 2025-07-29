'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import LoginPageCard from '@/components/login-page/login-page-card';
import { useClickOutside } from '@/hooks/useClickOutside';

const Header = () => {
  const [showLoginCard, setShowLoginCard] = useState(false);
  const loginCardRef = useRef<HTMLDivElement>(null);

  useClickOutside(loginCardRef as React.RefObject<HTMLElement>, () => setShowLoginCard(false));

  const toggleLoginCard = () => {
    setShowLoginCard((prev) => !prev);
  };

  return (
    <header className="w-full py-6 px-12 flex items-center justify-between absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/40 via-black/40 to-transparent shadow-lg">
      <Link
        href="/"
        className="text-white text-2xl md:text-4xl font-['EBGaramond']"
      >
        Sebsibe Elias
      </Link>

      <div className="flex-1 flex justify-center">
        <nav className="hidden md:flex items-center space-x-12">
          <Link
            href="/"
            className="text-white border-b-2 border-transparent hover:border-white pb-1 transition-all duration-200 font-['EBGaramond']"
          >
            Home
          </Link>
          <Link
            href="/user/about"
            className="text-white border-b-2 border-transparent hover:border-white pb-1 transition-all duration-200 font-['EBGaramond']"
          >
            About
          </Link>
          <Link
            href="/user/blogs"
            className="text-white border-b-2 border-transparent hover:border-white pb-1 transition-all duration-200 font-['EBGaramond']"
          >
            Blogs
          </Link>
          <Link
            href="/user/support"
            className="text-white border-b-2 border-transparent hover:border-white pb-1 transition-all duration-200 font-['EBGaramond']"
          >
            Support
          </Link>
          <Link
            href="/user/contact"
            className="text-white border-b-2 border-transparent hover:border-white pb-1 transition-all duration-200 font-['EBGaramond']"
          >
            Contact
          </Link>
        </nav>
      </div>

      {/* Sign In Button + Login Card */}
      <div className="ml-4 relative">
        <button
          onClick={toggleLoginCard}
          className="bg-white text-black rounded-md px-4 py-2 text-sm font-semibold shadow hover:bg-gray-200 transition duration-200"
        >
          Sign In
        </button>

        {showLoginCard && (
          <div
            ref={loginCardRef}
           
          >
            <LoginPageCard />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
