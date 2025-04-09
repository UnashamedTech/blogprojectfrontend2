import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Add the import for the font at the top if you haven't already
// import 'path-to-font/EbGaramond.css';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[360px] lg:h-[720px] flex items-center">
      <div className="absolute inset-0 z-0">
        <Image src="/images/herobg.jpg" alt="Hero Background" fill className="object-cover" priority />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/50 z-1"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-start">
        <div className="max-w-xl text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 font-serif">
            Welcome to My Journey
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-white mb-2 ml-4">
            Join me as I share my story, experiences, and mission to
          </p>
          <p className="text-base md:text-lg lg:text-xl text-white ml-20">
            make a positive impact in the world.
          </p>
          <Button className="bg-white text-black hover:bg-gray-100 font-medium px-4 py-2 rounded-md mt-4 ml-45">
            <Link href="/support">Support me</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}