import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function AboutSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum in vel massa donec sit. Mi ut risus sem
                malesuada ornare. Ac eu erat eget et lorem est arcu. Gravida hendrerit sit blandit semper lacus. Nulla
                amet suscipit sit lectus tortor. Dolor non eget suspendisse leo scelerisque sed d.
              </p>
            </div>
            <Button
              variant="secondary" 
              className="mt-8 bg-black text-white hover:bg-gray-800 transition"
              asChild
            >
              <Link href="/about">
                Read More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="flex justify-center">
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
  )
}