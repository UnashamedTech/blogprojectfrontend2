'use server';
import { Suspense } from 'react'
import BlogsPageView from '@/components/views/blogs-page'

function Blogs() {
  return (
    <Suspense>
      <BlogsPageView />
    </Suspense>
  )
}

export default Blogs