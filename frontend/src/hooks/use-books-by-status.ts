import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useCallback } from 'react';
import { getStatusBook } from '@/services/get-status-book';
import { changeStatusBook } from '@/services/change-status-book';
import { deleteBookStatus as deleteBookStatusService } from '../services/delete-status-book';

export function useBooksByStatus(status?: 'wishlist' | 'reading' | 'done' | 'delete') {
  const queryClient = useQueryClient();

  const {
    data: books = [],
    isLoading: loading,
    refetch: fetchBooks,
  } = useQuery({
    queryKey: ['books', status],
    queryFn: () => getStatusBook(status),
    enabled: true,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const updateBookStatus = useCallback(
    async (bookId: string, newStatus: 'wishlist' | 'reading' | 'done') => {
      setActionLoading(bookId);
      try {
        await changeStatusBook(bookId, newStatus);
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['books'] }),
          queryClient.invalidateQueries({ queryKey: ['count-books'] }),
        ]);
      } finally {
        setActionLoading(null);
      }
    },
    [queryClient],
  );

  const deleteBookStatus = useCallback(
    async (bookId: string) => {
      setActionLoading(bookId);
      try {
        await deleteBookStatusService(bookId);
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['books'] }),
          queryClient.invalidateQueries({ queryKey: ['count-books'] }),
        ]);
      } finally {
        setActionLoading(null);
      }
    },
    [queryClient],
  );

  return { books, loading, actionLoading, updateBookStatus, deleteBookStatus, fetchBooks };
}
