import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[360px] lg:h-[720px] flex items-center">
      <div className="absolute inset-0 z-0">
        <Image src="/images/hero2.jpg" alt="Hero Background" fill className="object-cover" priority />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/50 z-1"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-end">
        <div className="max-w-xl text-left mr-26"> 
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-7 font-serif">
            About My Journey
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-white mb-2 ml-7">
            Learn more about my story, faith, and
          </p>
          <p className="text-base md:text-lg lg:text-xl text-white ml-15">
            mission to make a difference.
          </p>
        </div>
      </div>
    </section>
  );
}