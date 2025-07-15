import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Add the import for the font at the top if you haven't already
// import 'path-to-font/EbGaramond.css';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[360px] lg:h-[720px] flex items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/herobg.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/50 z-1"></div>

      <div className="container mx-auto px-6 md:px-32 relative z-10 flex flex-col items-start">
        <div className="max-w-2xl flex flex-col items-center  text-left gap-2">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-3 font-['EBGaramond']">
            Welcome to My Journey
          </h1>
          <p className="px-3 text-base text-center md:text-lg lg:text-2xl text-white mb-2 ml-4 font-bold font-['EBGaramond']">
            Join me as I share my story, experiences, and mission to make a
            positive impact in the world.
          </p>
          <Link
            href="/user/support"
            className="flex items-center justify-center"
          >
            <Button className="bg-white text-base md:text-xl text-black hover:bg-black cursor-pointer font-bold p-5 rounded-sm mt-2 font-['EBGaramond'] hover:text-white">
              Support me
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
