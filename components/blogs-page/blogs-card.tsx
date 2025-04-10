'use client'
import { useState, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { MapPin, MessageSquare, ChevronRight, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination } from "@/components/blogs-page/pagination"

// Mock data - replace with real API calls later
const mockBlogs = [
  {
    id: 1,
    image: "/images/blog-1.jpg",
    category: "Faith",
    date: "2021-09-17",
    title: "Finding Peace in Faith",
    excerpt: "Discover how faith can bring peace to your daily life...",
    location: "Georgia",
    comments: 52
  },
  {
    id: 2,
    image: "/images/blog-2.jpg",
    category: "Faith",
    date: "2021-10-05",
    title: "The Power of Prayer",
    excerpt: "Exploring the transformative power of daily prayer...",
    location: "New York",
    comments: 34
  },
  {
    id: 3,
    image: "/images/blog-3.jpg",
    category: "Life",
    date: "2021-11-12",
    title: "Balancing Work and Family",
    excerpt: "Tips for maintaining harmony between career and home...",
    location: "California",
    comments: 28
  },
  {
    id: 4,
    image: "/images/blog-4.png",
    category: "Life",
    date: "2022-01-15",
    title: "Mindfulness Practices",
    excerpt: "Simple mindfulness exercises for stress reduction...",
    location: "Texas",
    comments: 41
  },
  {
    id: 5,
    image: "/images/blog-5.png",
    category: "Mission",
    date: "2022-03-22",
    title: "Community Outreach",
    excerpt: "How our mission is making a difference locally...",
    location: "Georgia",
    comments: 19
  },
  {
    id: 6,
    image: "/images/blog-6.png",
    category: "Mission",
    date: "2022-05-30",
    title: "Global Impact",
    excerpt: "Stories from our international mission trips...",
    location: "International",
    comments: 27
  }
]

export default function BlogsCard() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOption, setSortOption] = useState("newest")
  const [filteredBlogs, setFilteredBlogs] = useState(mockBlogs)
  const itemsPerPage = 6
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage)

  // Get current category from URL
  const currentCategory = pathname?.split("/").pop() || "all"

  // Handle search
  const handleSearch = () => {
    const query = searchQuery.toLowerCase()
    const filtered = mockBlogs.filter(blog => 
      blog.title.toLowerCase().includes(query) || 
      blog.excerpt.toLowerCase().includes(query) ||
      blog.category.toLowerCase().includes(query)
    )
    setFilteredBlogs(filtered)
    setCurrentPage(1)
  }

  // Handle category change
  const handleCategoryChange = (category: string) => {
    router.push(`/${category === "all" ? "" : category}`)
  }

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortOption(value)
    const sorted = [...filteredBlogs].sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      
      if (value === "newest") return dateB - dateA
      if (value === "oldest") return dateA - dateB
      return b.comments - a.comments // For "popular"
    })
    setFilteredBlogs(sorted)
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Filter blogs by category and search
  useEffect(() => {
    let filtered = [...mockBlogs]
    
    // Filter by category
    if (currentCategory !== "all") {
      filtered = filtered.filter(blog => blog.category.toLowerCase() === currentCategory.toLowerCase())
    }
    
    // Filter by search query if exists
    const query = searchParams?.get("q")
    if (query) {
      setSearchQuery(query)
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(query.toLowerCase()) || 
        blog.excerpt.toLowerCase().includes(query.toLowerCase())
      )
    }
    
    // Sort
    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      
      if (sortOption === "newest") return dateB - dateA
      if (sortOption === "oldest") return dateA - dateB
      return b.comments - a.comments // For "popular"
    })
    
    setFilteredBlogs(filtered)
    setCurrentPage(1)
  }, [currentCategory, searchParams, sortOption])

  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredBlogs.slice(startIndex, startIndex + itemsPerPage)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="border-b bg-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-4 px-4 gap-4">
          <div className="flex flex-wrap items-center gap-4 md:gap-8">
            <Link 
              href="/" 
              className={`font-medium ${currentCategory === "all" ? "text-black font-bold" : "text-gray-600"}`}
              onClick={() => handleCategoryChange("all")}
            >
              All Posts
            </Link>
            <Link 
              href="/faith" 
              className={`font-medium ${currentCategory === "faith" ? "text-black font-bold" : "text-gray-600"}`}
              onClick={() => handleCategoryChange("faith")}
            >
              Faith
            </Link>
            <Link 
              href="/life" 
              className={`font-medium ${currentCategory === "life" ? "text-black font-bold" : "text-gray-600"}`}
              onClick={() => handleCategoryChange("life")}
            >
              Life
            </Link>
            <Link 
              href="/mission" 
              className={`font-medium ${currentCategory === "mission" ? "text-black font-bold" : "text-gray-600"}`}
              onClick={() => handleCategoryChange("mission")}
            >
              Mission
            </Link>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Input 
                type="text" 
                placeholder="Search Posts" 
                className="w-full pr-8" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Search 
                className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 cursor-pointer" 
                onClick={handleSearch}
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Button 
                variant="default" 
                className="bg-black text-white hover:bg-gray-800 w-full md:w-auto"
                onClick={handleSearch}
              >
                Search
              </Button>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 hidden md:inline">Sort By:</span>
                <Select value={sortOption} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-28 border-none shadow-none">
                    <SelectValue placeholder="Newest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="popular">Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Blog Posts Section */}
      <section className="container mx-auto py-10 px-4">
        <h1 className="mb-8 text-3xl font-bold">
          {currentCategory === "all" ? "All Posts" : `${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)} Posts`}
        </h1>

        {filteredBlogs.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getCurrentPageItems().map((blog) => (
                <BlogCard
                  key={blog.id}
                  image={blog.image}
                  category={blog.category}
                  date={new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  title={blog.title}
                  excerpt={blog.excerpt}
                  location={blog.location}
                  comments={blog.comments}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          </>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-xl font-medium">No posts found</h3>
            <p className="text-gray-600 mt-2">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </section>
    </main>
  )
}

// BlogCard component remains the same
interface BlogCardProps {
  image: string
  category: string
  date: string
  title: string
  excerpt: string
  location: string
  comments: number
}

function BlogCard({ image, category, date, title, excerpt, location, comments }: BlogCardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow h-full flex flex-col">
      <div className="relative h-[280px] lg:h-[320px] w-full">
        <div className="absolute left-4 top-4 z-10 rounded bg-black px-3 py-1 text-sm font-medium text-white">
          {category}
        </div>
        <Image 
          src={image || "/placeholder.svg"} 
          alt={title} 
          fill 
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="px-6 py-4 flex-1 flex flex-col">
        <div className="mb-2 text-sm text-gray-500">{date}</div>
        <h2 className="mb-3 text-xl font-bold">{title}</h2>
        <p className="mb-4 text-gray-600 line-clamp-3">{excerpt}</p>
        <Link href="#" className="mb-4 flex items-center text-sm font-medium mt-auto">
          Continue Reading <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="mr-1 h-4 w-4" />
            {location}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MessageSquare className="mr-1 h-4 w-4" />
            Comment ({comments})
          </div>
        </div>
      </div>
    </div>
  )
}