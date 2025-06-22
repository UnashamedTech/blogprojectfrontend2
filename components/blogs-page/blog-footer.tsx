import { mockBlogs } from "@/components/blogs-page/blogs-card"
import BlogComments from "@/components/blogs-page/blog-comments-section"
import RelatedBlogs from "@/components/blogs-page/related-blogs"

interface BlogFooterProps {
  blogId: number
}

export default function BlogFooter({ blogId }: BlogFooterProps) {
  // Get the current blog to determine its category
  const currentBlog = mockBlogs.find((blog) => blog.id === blogId)

  return (
    <section className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <BlogComments blogId={blogId} />
        </div>
        <div className="lg:col-span-1">
          <RelatedBlogs currentBlogId={blogId} category={currentBlog?.category} />
        </div>
      </div>
    </section>
  )
}
