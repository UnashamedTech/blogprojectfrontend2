'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { Filter, Search, Trash2, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import type { FilterOption } from '@/types/data-table';
import { fetchedDataTable } from '@/actions/shared/data-table';
import Pagination from './pagination';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

export interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T) => React.ReactNode;
}

interface DataTableProps<T> {
  tag: string;
  apiUrl: string;
  columns: Column<T>[];
  searchFields?: (keyof T)[];
  filterOptions?: FilterOption<T>[];
  currentPage: number;
  onPageChange: (page: number) => void;
  onDelete?: (id: string | number) => Promise<void>;
  enableActions?: boolean;
  enablePagination?: boolean;
  onError?: (error: string) => void;
  triggerState: boolean;
  setTriggerState: React.Dispatch<React.SetStateAction<boolean>>;
  itemsPerPage?: number;
  onItemsPerPageChange?: React.Dispatch<React.SetStateAction<number>>;
}

const DataTable = <T extends { id: string | number }>({
  tag,
  apiUrl,
  columns,
  searchFields = [],
  filterOptions = [],
  itemsPerPage,
  currentPage,
  onPageChange,
  onDelete,
  enableActions = true,
  enablePagination = true,
  onError,
  triggerState,
  onItemsPerPageChange,
  setTriggerState,
}: DataTableProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    id: string | number | null;
  }>({ open: false, id: null });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchedDataTable(
          apiUrl,
          tag,
          currentPage,
          itemsPerPage ?? 10
        );

        if (response && response.data) {
          setData(response.data);
          setTotalPages(response.meta.totalPages); // Use meta.totalPages for pagination
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        onError?.(
          error instanceof Error
            ? error.message
            : 'An error occurred while fetching data'
        );
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiUrl, currentPage, itemsPerPage, tag, onError, triggerState]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  // Apply search and filters to the data
  const filteredData = data.filter((item) => {
    // Apply search
    const matchesSearch = searchFields.some((field) =>
      item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply filters
    const matchesFilters = filters.every((filter) => {
      const [key, value] = filter.split(':');
      return item[key as keyof T]?.toString() === value;
    });

    return matchesSearch && matchesFilters;
  });


  const handleDelete = (id: string | number) => {
    setDeleteDialog({ open: true, id });
  };

  const confirmDelete = async () => {
    const id = deleteDialog.id;
    if (!id) return;

    try {
      await onDelete?.(id);
      setData((prev) => prev.filter((item) => item.id !== id));
      setDeleteDialog({ open: false, id: null });
      setTriggerState(!triggerState);
    } catch (error) {
      onError?.(
        error instanceof Error
          ? error.message
          : 'An error occurred while deleting'
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
        {filterOptions.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {filterOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={`${String(option.key)}:${option.label}`}
                  checked={filters.includes(
                    `${String(option.key)}:${option.label}`
                  )}
                  onCheckedChange={() => {
                    const filterString = `${String(option.key)}:${
                      option.label
                    }`;
                    setFilters((prev) =>
                      prev.includes(filterString)
                        ? prev.filter((f) => f !== filterString)
                        : [...prev, filterString]
                    );
                  }}
                >
                  {option.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {filters.map((filter) => (
          <Badge key={filter} variant="secondary" className="gap-2">
            {filter.split(':')[1]}
            <Button
              onClick={() => {
                setFilters((prev) => prev.filter((f) => f !== filter));
              }}
              className="focus:outline-none"
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key as string}>{col.header}</TableHead>
              ))}
              {enableActions && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: itemsPerPage ?? 0 }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((col) => (
                    <TableCell key={col.key as string}>
                      <Skeleton className="h-6 w-24" />
                    </TableCell>
                  ))}
                  {enableActions && (
                    <TableCell>
                      <Skeleton className="h-6 w-6" />
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : filteredData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (enableActions ? 1 : 0)}
                  className="text-center"
                >
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((item) => (
                <TableRow key={item.id}>
                  {columns.map((col) => (
                    <TableCell key={col.key as string}>
                      {col.render
                        ? col.render(item)
                        : (item[col.key] as React.ReactNode)}
                    </TableCell>
                  ))}
                  {enableActions && (
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(item.id)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {enablePagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      )}
      <Dialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this item? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialog({ open: false, id: null })}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DataTable;
