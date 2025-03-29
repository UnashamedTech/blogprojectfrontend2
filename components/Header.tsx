import Link from "next/link";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full py-6 px-12 flex items-center justify-between absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/40 via-black/40 to-transparent  shadow-lg">
      <Link href="/" className="text-white text-2xl md:text-3xl font-serif">
        Sebsibe Elias
      </Link>
      <div className="flex-1 flex justify-center">
        <nav className="hidden md:flex items-center space-x-12">
          <Link href="/" className="text-white border-b-2 border-transparent hover:border-white pb-1 font-medium transition duration-200">
            Home
          </Link>
          <Link href="/about" className="text-white border-b-2 border-transparent hover:border-white pb-1 transition-all duration-200 font-medium">
            About
          </Link>
          <Link
            href="/blogs"
            className="text-white border-b-2 border-transparent hover:border-white pb-1 transition-all duration-200 font-medium"
          >
            Blogs
          </Link>
          <Link
            href="/support"
            className="text-white border-b-2 border-transparent hover:border-white pb-1 transition-all duration-200 font-medium"
          >
            Support
          </Link>
          <Link
            href="/contact"
            className="text-white border-b-2 border-transparent hover:border-white pb-1 transition-all duration-200 font-medium"
          >
            Contact
          </Link>
        </nav>
      </div>
      <Button variant="outline" className="bg-white text-black hover:bg-gray-100 font-medium rounded-md">
        Sign In
      </Button>
    </header>
  );
}

export default Header;