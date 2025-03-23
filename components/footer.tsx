import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Facebook, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#1e2124] text-white">
      <div className="container mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* My Journey Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">My Journey</h3>
            <p className="text-gray-300">Join me on my journey and support my mission to make a difference.</p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-300 hover:text-white transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Address Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Address</h3>
            <ul className="space-y-2 text-gray-300">
              <li>SebsibeElias@gmail.com</li>
              <li>Tel: +251916272791</li>
              <li>Addis Ababa, Ethiopia</li>
            </ul>
          </div>

          {/* Contact Me Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Me</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block mb-1">
                  Full Name
                </label>
                <Input id="fullName" type="text" className="bg-white text-black w-full" />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1">
                  Email Address
                </label>
                <Input id="email" type="email" className="bg-white text-black w-full" />
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

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-2xl font-serif">
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

          <div className="text-sm text-gray-300">
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

