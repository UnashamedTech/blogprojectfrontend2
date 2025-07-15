import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="py-8 lg:py-24 flex justify-center">
      <div className="container mx-auto px-0  md:px-6 lg:px-20 flex justify-center">
        <div className="grid  lg:grid-cols-5 lg:gap-28 items-center justify-center px-6 ">
          <div className="col-span-3 items-center justify-center">
            <h2 className="text-3xl text-center md:text-4xl font-bold mb-6 font-['EBGaramond']">
              About Me
            </h2>
            <div className="lg:hidden flex items-center justify-center">
              <div className="relative  w-[280px] max-w-md h-[280px] md:w-[360px] md:h-[400px] rounded-lg overflow-hidden mb-4 ">
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

            <div className="space-y-4 text-gray-700 font-['EBGaramond']">
              <p className="text-justify text-[16px] md:text-lg ">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse
                eum provident tempore officia qui facere iste veniam sunt!
                Provident quis, sed praesentium omnis molestias at ipsam
                inventore atque, debitis amet, repudiandae exercitationem
                architecto iusto! Possimus saepe sequi necessitatibus alias
                illum distinctio quod ex harum qui. Aut distinctio veritatis
                quas dolor quaerat numquam animi unde facilis? Quod quam
                repudiandae, eveniet, quo in tempora dolorem provident amet ut
                delectus dignissimos vel quia, natus culpa exercitationem? Ab
                alias consequuntur quasi nulla dignissimos placeat esse cum
                dolorem dolores inventore saepe repellat, maxime culpa quisquam
                rerum fuga excepturi quidem vero tempora nobis sint libero
                dolore numquam! Non nulla maxime illo nam explicabo debitis
                voluptatibus. Ullam vel delectus quo ex quidem cum vero impedit
                deleniti suscipit, quia qui repudiandae dolores corporis
                blanditiis distinctio corrupti? Hic repellat quis voluptatum
                necessitatibus voluptate, numquam error, architecto placeat sunt
                tempore soluta voluptatibus doloribus blanditiis atque? Dolorum
                autem ad reiciendis quae totam veritatis? Necessitatibus non
                nulla vero rerum et vel ut, nostrum quidem, eos facere similique
                tempore? Neque exercitationem sint autem magni possimus odio
                obcaecati corporis consectetur accusamus praesentium perferendis
                quas fuga sequi, sunt maiores nulla cum facilis tempora.
                Necessitatibus distinctio temporibus fugiat nam delectus
                excepturi vel assumenda nisi deleniti explicabo?
              </p>
            </div>
            <Button
              variant="secondary"
              className="mt-8 px-6  bg-black text-white hover:bg-gray-800 transition font-['EBGaramond']"
            >
              <Link
                href="/user/about"
                className="py-4  flex items-center text-sm md:text-lg"
              >
                Read More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className=" col-span-2 flex justify-end">
            <div className="relative hidden lg:block w-full max-w-md h-[480px] rounded-lg overflow-hidden">
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
