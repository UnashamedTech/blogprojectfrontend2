"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, MapPin, MessageSquare } from "lucide-react"
import { mockBlogs } from "@/components/blogs-page/blogs-card"

interface RelatedBlogsProps {
  currentBlogId: number
  category?: string
}

export default function RelatedBlogs({ currentBlogId, category }: RelatedBlogsProps) {
  const [relatedBlogs, setRelatedBlogs] = useState<typeof mockBlogs>([])

  useEffect(() => {
    // Get the current blog
    const currentBlog = mockBlogs.find((blog) => blog.id === currentBlogId)

    if (!currentBlog) {
      setRelatedBlogs([])
      return
    }

    // Filter blogs by category and exclude current blog
    const filteredBlogs = mockBlogs.filter(
      (blog) =>
        blog.id !== currentBlogId &&
        (category ? blog.category.toLowerCase() === category.toLowerCase() : blog.category === currentBlog.category),
    )

    // Sort by date (newest first) and take up to 4
    const sortedBlogs = [...filteredBlogs]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4)

    setRelatedBlogs(sortedBlogs)
  }, [currentBlogId, category])

  if (relatedBlogs.length === 0) {
    return null
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">Read Similar Blogs</h2>
      <div className="space-y-6">
        {relatedBlogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="flex flex-row">
              <div className="relative h-24 w-24 sm:h-28 sm:w-28">
                <Image src={blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
              </div>
              <div className="p-3 flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg line-clamp-1">{blog.title}</h3>
                  <span className="text-xs text-gray-500">
                    {new Date(blog.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{blog.excerpt}</p>
                <div className="mt-2 flex justify-between items-center">
                  <Link href={`/user/blogs/${blog.id}`} className="flex items-center text-sm font-medium">
                    Continue Reading <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="mr-1 h-3 w-3" />
                      {blog.location}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <MessageSquare className="mr-1 h-3 w-3" />
                      Comment ({blog.comments})
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
