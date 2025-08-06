'use client';

import { Suspense } from 'react';
import AdminView from '@/components/views/admin/dashboard';

function AdminPageContent() {
  return <AdminView />;
}

function AdminPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminPageContent />
    </Suspense>
  );
}

export default AdminPage;
