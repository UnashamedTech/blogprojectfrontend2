'use client';

import { useParams } from "next/navigation";
import { mockBlogs } from "@/components/blogs-page/blogs-card";

export default function BlogHeader() {
  const params = useParams();
  const blogId = params ? Number(params.id) : null;
  const blog = mockBlogs.find((blog) => blog.id === blogId);

  if (!blog) {
    return null;
  }

  const formattedDate = new Date(blog.date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="w-full bg-[#F8F5F5] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-12 leading-tight">
          3 Years of Empowering Youth<br />through Spiritual Change
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-800">
          <div className="text-center">
            <p className="text-sm font-medium mb-1">Published By:</p>
            <p className="text-lg font-semibold italic">{blog.author}</p>
          </div>
          
          <div className="text-center">
            <p className="text-sm font-medium mb-1">Published On:</p>
            <p className="text-lg font-semibold">{formattedDate}</p>
          </div>
          
          <div className="text-center">
            <p className="text-sm font-medium mb-1">Category:</p>
            <p className="text-lg font-semibold">{blog.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
}