import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function VideoSection() {
  return (
    <section className="py-16 md:py-24 px-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/video-thumbnail.png"
              alt="Video thumbnail"
              width={700}
              height={500}
              className="w-full h-auto"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold font-['EBGaramond']">
              Watch My Story
            </h2>
            <p className="text-xl font-medium text-gray-700  font-['EBGaramond']">
              Get to know me better through this personal introduction. I share
              my journey, values, and the mission that drives me to make a
              difference in the world. Join me as I take you through my
              experiences and the impact I hope to create.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 h-auto text-lg rounded-md font-['EBGaramond'] cursor-pointer">
                Subscribe
              </Button>

              <Button
                variant="outline"
                className="bg-black text-white border-black hover:bg-gray-800 hover:text-white px-4 py-2 h-auto text-lg rounded-md cursor-pointer font-['EBGaramond']"
              >
                Share Video
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
