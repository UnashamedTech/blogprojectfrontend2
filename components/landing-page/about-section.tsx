import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="py-16 md:py-24  flex justify-center">
      <div className="container mx-auto px-6 md:px-24 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-32 items-center justify-center px-6 ">
          <div className="col-span-3">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['EBGaramond']">
              About Me
            </h2>
            <div className="space-y-4 text-gray-700 font-['EBGaramond']">
              <p className="text-justify text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum in
                vel massa donec sit. Mi ut risus sem malesuada ornare. Ac eu
                erat eget et lorem est arcu. Gravida hendrerit sit blandit
                semper lacus. Nulla amet suscipit sit lectus tortor. Dolor non
                eget suspendisse leo scelerisque sed d. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Cum in vel massa donec sit.
                Mi ut risus sem malesuada ornare. Ac eu erat eget et lorem est
                arcu. Gravida hendrerit sit blandit semper lacus. Nulla amet
                suscipit sit lectus tortor. Dolor non eget suspendisse leo
                scelerisque sed d. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Cum in vel massa donec sit. Mi ut risus sem
                malesuada ornare. Ac eu erat eget et lorem est arcu. Gravida
                hendrerit sit blandit semper lacus. Nulla amet suscipit sit
                lectus tortor. Dolor non eget suspendisse leo scelerisque sed d.
              </p>
            </div>
            <Button
              variant="secondary"
              className="mt-8 px-6  bg-black text-white hover:bg-gray-800 transition font-['EBGaramond']"
            >
              <Link href="/about" className="py-4 flex items-center text-lg">
                Read More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className=" col-span-2 flex justify-end">
            <div className="relative w-full max-w-md h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/images/family-photo.png"
                alt="Family photo"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
