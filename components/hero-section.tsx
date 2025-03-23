import Image from "next/image"
import { Button } from "../components/ui/button"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative w-full h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/herobg.jpg" 
          alt="Hero Background" 
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Dark overlay with z-index 5 */}
      <div className="absolute inset-0 bg-black/50 z-5"></div>

      {/* Content with z-index 6 */}
      <div className="container mx-auto px-6 md:px-12 relative z-6">
        <div className="max-w-2xl pt-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Welcome to My Journey
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8">
            Join me as I share my story, experiences, and mission to make a positive impact in the world.
          </p>
          <Button className="bg-white text-black hover:bg-gray-100 font-medium px-8 py-6 text-lg rounded-md" asChild>
            <Link href="/support">Support me</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
