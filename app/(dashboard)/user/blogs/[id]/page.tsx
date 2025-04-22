"use client";

import { useParams } from "next/navigation";
import { mockBlogs } from "@/components/blogs-page/blogs-card";
import Header from "@/components/landing-page/Header";
import HeroSection from "@/components/blogs-page/blog-post-hero";
import BlogHeader from "@/components/blogs-page/blog-header"
import Blog from "@/components/blogs-page/blog"
import SupportSection from "@/components/landing-page/support-section";
import Footer from "@/components/landing-page/footer";

export default function BlogPost() {
  const params = useParams();
  const blogId = params ? Number(params.id) : null;
  const blog = mockBlogs.find((blog) => blog.id === blogId);

  if (!blog) {
    return <div>Blog post not found</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="relative">
        <div className="absolute w-full z-20">
          <Header />
        </div>
        <HeroSection />
        <BlogHeader />
        <Blog />
      </div>
      <SupportSection />
      <Footer />
    </div>
  );
}
