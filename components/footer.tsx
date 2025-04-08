import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Facebook, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#1e2124] text-white">
      <div className="container mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-10">
          
          <div style={{ fontFamily: 'EB Garamond, serif' }}>
            <h3 className="text-xl font-bold mb-4">My Journey</h3>
            <p className="text-gray-300">Join me on my journey and support my mission to make a difference.</p>
          </div>

         
          <div style={{ fontFamily: 'EB Garamond, serif' }}>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[{href: "/", label: "Home"}, {href: "/about", label: "About"}, {href: "/blogs", label: "Blog"}, {href: "/support", label: "Support"}, {href: "/contact", label: "Contact"}].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          
          <div style={{ fontFamily: 'EB Garamond, serif' }}>
            <h3 className="text-xl font-bold mb-4">Address</h3>
            <ul className="space-y-2 text-gray-300">
              <li>SebsibeElias@gmail.com</li>
              <li>Tel: +251916272791</li>
              <li>Addis Ababa, Ethiopia</li>
            </ul>
          </div>

          
          <div style={{ fontFamily: 'EB Garamond, serif' }}>
            <h3 className="text-xl font-bold mb-4">Contact Me</h3>
            <form className="space-y-4 flex flex-col" style={{ fontFamily: 'EB Garamond, serif' }}>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label htmlFor="fullName" className="block mb-1">
                    Full Name
                  </label>
                  <Input id="fullName" type="text" className="bg-white text-black w-full" />
                </div>
                <div className="flex-1">
                  <label htmlFor="email" className="block mb-1">
                    Email Address
                  </label>
                  <Input id="email" type="email" className="bg-white text-black w-full" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block mb-1">
                  Message
                </label>
                <Textarea id="message" className="bg-white text-black w-full min-h-[120px]" />
              </div>
              <Button type="submit" className="bg-white text-black hover:bg-gray-200">
                Send A Message
              </Button>
            </form>
          </div>
        </div>
      </div>

      
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-2xl font-serif" style={{ fontFamily: 'EB Garamond, serif' }}>
              Sebsibe Elias
            </Link>
          </div>

          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link href="#" aria-label="Facebook">
              <Facebook className="h-5 w-5 text-gray-300 hover:text-white transition-colors" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-gray-300 hover:text-white transition-colors" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-gray-300 hover:text-white transition-colors" />
            </Link>
          </div>

          <div className="text-sm text-gray-300" style={{ fontFamily: 'EB Garamond, serif' }}>
            © 2025 Sebsibe Elias. All rights reserved |
            <Link href="/terms" className="hover:text-white ml-1 mr-1">
              Terms
            </Link>{" "}
            |
            <Link href="/privacy" className="hover:text-white ml-1">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}