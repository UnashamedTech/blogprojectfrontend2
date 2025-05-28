import type React from 'react';

export interface Column<T> {
    key: keyof T;
    header: string;
    render?: (value: T) => React.ReactNode;
}

export interface DataTableProps<T> {
    tag: string;
    apiUrl: string;
    columns: Column<T>[];
    searchFields?: (keyof T)[];
    filterOptions?: FilterOption<T>[];
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    onDelete?: (id: string | number) => Promise<void>;
    enableActions?: boolean;
    enablePagination?: boolean;
    onError?: (error: string) => void;
    triggerState: boolean;
    setTriggerState: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FilterOption<T> {
    key: keyof T;
    label: string;
}
