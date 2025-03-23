import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin, MessageSquare } from "lucide-react"

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "Blog - 1",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna...",
    date: "September 17, 2021",
    category: "Faith",
    image: "/images/blog-1.jpg",
    location: "Georgia",
    comments: 52,
  },
  {
    id: 2,
    title: "Blog - 2",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna...",
    date: "September 17, 2021",
    category: "Faith",
    image: "/images/blog-2.jpg",
    location: "Georgia",
    comments: 52,
  },
  {
    id: 3,
    title: "Blog - 3",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna...",
    date: "September 17, 2021",
    category: "Faith",
    image: "/images/blog-3.jpg",
    location: "Georgia",
    comments: 52,
  },
]

export default function BlogSection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/Background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Blogs</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Explore my latest thoughts, experiences, and insights as I share my journey with you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                <div className="absolute top-4 left-4">
                  <span className="bg-black text-white text-sm font-medium px-3 py-1 rounded">{post.category}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="border-l-2 border-black pl-3 mb-4">
                  <p className="text-sm font-medium">{post.date}</p>
                </div>

                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-700 mb-4">{post.excerpt}</p>

                <Link
                  href={`/blogs/${post.id}`}
                  className="inline-flex items-center text-black font-medium hover:underline mb-6"
                >
                  Continue Reading <ArrowRight className="ml-2 h-4 w-4" />
                </Link>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{post.location}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>Comment ({post.comments})</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/blogs"
            className="inline-flex items-center bg-black text-white px-6 py-3 rounded font-medium hover:bg-gray-800 transition-colors"
          >
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

