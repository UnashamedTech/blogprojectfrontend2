'use client';

import type React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/admin/data-table';
import type { Column } from '@/types/data-table';
import { toast } from 'sonner';
import { AddNewDialog } from './add-new-dialog';
import { endPoints } from '@/data/end-points';
import { deleteBlog } from '@/actions/admin/admin';
import type { Blogs } from '@/types/blog';
import { ThumbsUp, MessageSquare } from 'lucide-react';

const columns: Column<Blogs>[] = [
  { key: 'Title', header: 'Title' },
  { key: 'Category', header: 'Category' },
  { key: 'location', header: 'Location' },
  {
    key: 'CreatedDate',
    header: 'Created Date',
    render: (blog: Blogs) =>
      blog.CreatedDate ? new Date(blog.CreatedDate).toLocaleDateString() : '-',
  },
  {
    key: 'CommentsAndLikes',
    header: 'Comments & Likes',
    render: (blog: Blogs) => (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <ThumbsUp className="w-4 h-4 text-muted-foreground" />
          <span>{blog.Likes || 0}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MessageSquare className="w-4 h-4 text-muted-foreground" />
          <span>{blog.Comments || 0}</span>
        </div>
      </div>
    ),
  },
];

const searchFields: (keyof Blogs)[] = ['Title', 'CreatedDate', 'Category', 'location'];

const BlogsTable: React.FC = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [triggerState, setTriggerState] = useState<boolean>(false);
  const endPoint = `${endPoints.blogs}`; 
  const [itemsPerPage, onItemsPerPageChange] = useState<number>(10);

  const handleDelete = async (id: string | number) => {
    try {
      const response = await deleteBlog(id as string);
      if (response.error) {
        toast.error('Failed to delete the blog. Please try again later.');
      }
      setTriggerState(!triggerState);
      toast.success('Blog successfully deleted.');
    } catch {
      toast.error('An error occurred while deleting the blog.');
    }
  };

  const handleView = (blog: Blogs) => {
    router.push(`/admin/blogs/${blog.id}`);
  };

  return (
    <div className="flex-1 p-4 bg-secondary dark:bg-gray-900">
      <div className="space-y-6 bg-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Blogs</h1>
          <h2 className="text-xl">Manage Your Blogs Here.</h2>
          <AddNewDialog
            triggerState={triggerState}
            setTriggerState={setTriggerState}
          />
        </div>
        <DataTable<Blogs>
          tag="blogs-table"
          apiUrl={endPoint}
          columns={columns}
          searchFields={searchFields}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onDelete={handleDelete}
          onView={handleView}
          actionConfig={{
            view: true,
            edit: true,
            delete: true,
          }}
          triggerState={triggerState}
          setTriggerState={setTriggerState}
        />
      </div>
    </div>
  );
};

export default BlogsTable;
