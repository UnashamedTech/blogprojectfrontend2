import { Button } from "@/components/ui/button"
import { Heart, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function SupportSection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-[#F7FAFF]">
     
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/Background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex justify-center mb-8">
          <Heart className="h-16 w-16 text-black" />
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Support Me</h2>
          <p className="text-lg text-gray-700 mb-10">
            Your support helps me continue sharing God&apos;s love and making a positive impact in the world. Every
            contribution, no matter how small&lsquo; makes a difference.
          </p>

          <Button className="bg-black text-white hover:bg-gray-800 px-4 py-2 h-auto text-lg rounded-md" asChild>
            <Link href="/support" className="inline-flex items-center">
              Support <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}