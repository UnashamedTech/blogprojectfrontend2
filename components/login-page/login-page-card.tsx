"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { googleAuthCallback } from '@/actions/auth/auth';
import { googleAuthCallbackk } from '@/actions/auth/login';
import { X } from "lucide-react"
import { useClickOutside } from "@/hooks/useClickOutside"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"

const LoginPageCard = () => {
  const [showModal, setShowModal] = useState(true)
  const modalRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleClose = () => {
    setShowModal(false)
  }

  useClickOutside(modalRef as React.RefObject<HTMLElement>, handleClose)

  // Handle token processing when redirected back from Google
  useEffect(() => {
    const token = searchParams?.get('token');
    console.log("Token from URL:", token);
    if (!token) return;

    const handleToken = async () => {
      const result = await googleAuthCallback(token);

      if (result.success) {
        router.push('/log-in');// Directly refresh — no account selection
      }
    };

    handleToken();
  }, [searchParams, router]);

  const handleLogin = () => {
    googleAuthCallbackk(); // Trigger Google login
  };

  if (!showModal) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl md:h-[500px] flex flex-col md:flex-row overflow-hidden rounded-xl shadow-2xl bg-white"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white hover:text-gray-500 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-10 bg-white">
          <CardHeader className="text-center px-0">
            <CardTitle className="text-3xl font-bold font-[Comic_Sans_MS]">
              Hello There! <span className="text-yellow-500">😄</span>
            </CardTitle>
            <CardDescription className="text-lg text-black font-semibold">
              Login to Continue
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-center gap-4 mt-6 px-0">
            <Button
              className="w-full max-w-sm h-10 font-medium text-sm bg-white text-black border border-gray-300 shadow hover:bg-gray-100"
              variant="outline"
              onClick={handleLogin}
            >
              <Image
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
              />
              Login with Google
            </Button>
          </CardContent>
        </div>

        {/* Right Section */}
        <div className="hidden md:block w-1/2 h-full relative">
          <Image
            src="/images/login.png"
            alt="Login Visual"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPageCard;
