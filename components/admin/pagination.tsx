import type React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <div className="flex items-center space-x-2">
        <label htmlFor="itemsPerPage" className="text-sm">
          Items per page:
        </label>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            onItemsPerPageChange &&
            onItemsPerPageChange((itemsPerPage || 1) - 1)
          }
          disabled={itemsPerPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="px-2">{itemsPerPage}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            onItemsPerPageChange &&
            onItemsPerPageChange((itemsPerPage || 1) + 1)
          }
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
