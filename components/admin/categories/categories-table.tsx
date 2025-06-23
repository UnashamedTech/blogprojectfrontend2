'use client'; 
import type React from 'react';
import { useState } from 'react';
import DataTable from '@/components/admin/data-table';
import type { Column } from '@/types/data-table';
import { toast } from 'sonner';
import { AddNewDialog } from './add-new-dialog';
import { endPoints } from '@/data/end-points';
import { deleteCategory, updateCategory } from '@/actions/admin/admin';
import type { Categories } from '@/types/categories';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const columns: Column<Categories>[] = [
  { key: 'CategoryName', header: 'Category Name' },
  { key: 'Description', header: 'Description' },
  {
    key: 'CreatedDate',
    header: 'Created Date',
    render: (category: Categories) =>
      category.CreatedDate ? new Date(category.CreatedDate).toLocaleDateString() : '-',
  },
];

const searchFields: (keyof Categories)[] = ['CategoryName', 'CreatedDate'];

const CategoriesTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [triggerState, setTriggerState] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Categories | null>(null);
  const [editFormData, setEditFormData] = useState({
    categoryName: '',
    description: '',
  });

  const endPoint = `${endPoints.categories}`; 
  const [itemsPerPage, onItemsPerPageChange] = useState<number>(10);

  const handleDelete = async (id: string | number) => {
    try {
      const response = await deleteCategory(id as string);
      if (response.error) {
        toast.error('Failed to delete the category. Please try again later.');
      }

      setTriggerState(!triggerState);
      toast.success('Category successfully deleted.');
    } catch {
      toast.error('An error occurred while deleting the category.');
    }
  };

  const handleEdit = (category: Categories) => {
    setSelectedCategory(category);
    setEditFormData({
      categoryName: category.CategoryName || '',
      description: category.Description || '',
    });
    setIsEditDialogOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryUpdate = async () => {
    if (!selectedCategory) return;
    
    try {
      const response = await updateCategory(selectedCategory.id as string, {
        CategoryName: editFormData.categoryName,
        Description: editFormData.description
      });

      if (response.error) {
        toast.error('Failed to update category');
        return;
      }

      toast.success('Category updated successfully');
      setIsEditDialogOpen(false);
      setTriggerState(!triggerState); 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('An error occurred while updating the category');
    }
  };

  return (
    <div className="flex-1 p-4 bg-secondary dark:bg-gray-900">
      <div className="space-y-6 bg-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Categories</h1>
          <h2 className="text-xl">Manage Your Blog Categories Here.</h2>
          <AddNewDialog
            triggerState={triggerState}
            setTriggerState={setTriggerState}
          />
        </div>
        <DataTable<Categories>
          tag="categories-table"
          apiUrl={endPoint}
          columns={columns}
          searchFields={searchFields}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onDelete={handleDelete}
          onEdit={handleEdit}
          actionConfig={{
            view: false,
            edit: true,
            delete: true,
          }}
          triggerState={triggerState}
          setTriggerState={setTriggerState}
        />

        
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
              <DialogDescription>
                Update category details. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="categoryName" className="text-right">
                  Category Name
                </Label>
                <Input
                  id="categoryName"
                  name="categoryName"
                  value={editFormData.categoryName}
                  onChange={handleFormChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={editFormData.description}
                  onChange={handleFormChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="button"
                onClick={handleCategoryUpdate}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CategoriesTable;