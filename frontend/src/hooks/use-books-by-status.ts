import { useEffect, useState, useCallback } from 'react';
import { getStatusBook, IGetStatusBook } from '@/services/get-status-book';
import { changeStatusBook } from '@/services/change-status-book';

export function useBooksByStatus(status: 'wishlist' | 'reading' | 'done') {
  const [books, setBooks] = useState<IGetStatusBook[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getStatusBook(status);
      setBooks(data);
    } catch {
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [status]);

  const updateBookStatus = useCallback(
    async (bookId: string, newStatus: 'wishlist' | 'reading' | 'done') => {
      setActionLoading(bookId);
      try {
        await changeStatusBook(bookId, newStatus);
        await fetchBooks();
      } finally {
        setActionLoading(null);
      }
    },
    [fetchBooks],
  );

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return { books, loading, actionLoading, updateBookStatus, fetchBooks };
}
