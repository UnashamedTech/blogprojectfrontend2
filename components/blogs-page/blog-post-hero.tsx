'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

export default function HeroSection() {
  const images = [
    '/images/blog-1.jpg',
    '/images/blog-2.jpg',
    '/images/blog-3.jpg',
    '/images/blog-4.png',
    '/images/blog-5.png',
    '/images/blog-6.png',
  ];

  return (
    <section className="relative w-full h-[360px] lg:h-[720px]">
      <Carousel
        className="w-full h-full"
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="h-[360px] lg:h-[720px]">
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-full">
                <Image
                  src={image}
                  alt={`Hero image ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/20"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 hidden md:flex" />
        <CarouselNext className="right-4 hidden md:flex" />
      </Carousel>
    </section>
  );
}
