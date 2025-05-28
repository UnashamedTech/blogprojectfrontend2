'use client';

import { useParams } from 'next/navigation';
import { mockBlogs } from '@/components/blogs-page/blogs-card';
import Header from '@/components/landing-page/Header';
import HeroSection from '@/components/blogs-page/blog-post-hero';
import BlogHeader from '@/components/blogs-page/blog-header';
import Blog from '@/components/blogs-page/blog';
import BlogFooter from '@/components/blogs-page/blog-footer';
import SupportSection from '@/components/landing-page/support-section';
import Footer from '@/components/landing-page/footer';
import { useEffect } from 'react';

export default function BlogPost() {
  const params = useParams();

  // Ensure blogId is a valid number
  const blogId = Number(params?.id);
  
  const blog = mockBlogs.find((blog) => blog.id === blogId);

  useEffect(() => {
    if (blogId) {
      // Store the blogId in sessionStorage for auth redirect
      sessionStorage.setItem('currentBlogId', blogId.toString());
    }
  }, [blogId]);

  if (!blog || isNaN(blogId)) {
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
        <BlogFooter blogId={blogId} />
      </div>
      <SupportSection />
      <Footer />
    </div>
  );
}