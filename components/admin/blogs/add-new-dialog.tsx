'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { addCategory } from '@/actions/admin/admin';

interface AddNewFormData {
  CategoryName: string;
  Description: string;
}

interface AddNewDialogProps {
  triggerState: boolean;
  setTriggerState: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddNewDialog({
  triggerState,
  setTriggerState,
}: AddNewDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<AddNewFormData>({
    CategoryName: '',
    Description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await addCategory({
        CategoryName: formData.CategoryName,
        Description: formData.Description
      });

      if (response.error) {
        toast.error('Failed to add category. Please try again later.');
        return;
      }

      toast.success(`"${formData.CategoryName}" category added successfully`);
      setFormData({ CategoryName: '', Description: '' });
      setIsOpen(false);
      setTriggerState(!triggerState); 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'}>
          <span className="mr-1">+</span> Add New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Add a new category for your blogs
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="categoryName">Category Name</Label>
            <Input
              id="categoryName"
              name="CategoryName"
              placeholder="e.g., Faith"
              value={formData.CategoryName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="Description"
              placeholder="Add a description for this category"
              value={formData.Description}
              onChange={handleChange}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#0CAF60] hover:bg-[#0CAF60]"
          >
            Add Category
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}