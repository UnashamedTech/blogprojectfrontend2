'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import HeroSection from '@/components/blogs-page/blog-post-hero';
import BlogHeader from '@/components/blogs-page/blog-header'; 
import Blog from '@/components/blogs-page/blog'; 

import AdminBlogComments from '@/components/admin/blogs/admin-blog-comments'; 

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react'; 

import { deleteBlog } from '@/actions/admin/admin';

import { mockBlogs } from '@/components/blogs-page/blogs-card'; 

export default function AdminBlogViewPage() {
  const params = useParams();
  const router = useRouter();
  const blogId = params?.id? Number(params.id) : null;
  const [isDeleting, setIsDeleting] = useState(false);

  const blog = blogId? mockBlogs.find((b) => b.id === blogId) : null;

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Blog Not Found</h1>
        <p className="text-gray-600 mb-8">The requested blog post could not be found.</p>
        <Button onClick={() => router.back()}>Back to Blogs</Button>
      </div>
    );
  }

  const handleDeleteBlog = async () => {
    setIsDeleting(true);
    try {
      const response = await deleteBlog(blog.id.toString());
      if (response.error) {
        toast.error('Failed to delete the blog. Please try again later.');
      } else {
        toast.success('Blog successfully deleted.');
        router.push('/admin/blogs'); 
      }
    } catch (error) {
      toast.error('An error occurred while deleting the blog.');
      console.error('Delete blog error:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full bg-white dark:bg-gray-800 shadow-sm py-4 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-left"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back to Blogs
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Viewing Blog</h1>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="flex items-center gap-2" disabled={isDeleting}>
              <Trash2 className="h-4 w-4" />
              Delete Blog
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the blog post
                and remove its data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteBlog} disabled={isDeleting}>
                {isDeleting? 'Deleting...' : 'Continue'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="relative">
        <HeroSection />
        <BlogHeader  />
        <Blog />
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-[1200px] py-16">
        <AdminBlogComments blogId={blog.id} />
      </div>
    </div>
  );
}