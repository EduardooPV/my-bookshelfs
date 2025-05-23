import { useQuery } from '@tanstack/react-query';
import { getCountStatusBooks, ICountStatusBook } from '@/services/count-status-book';

export function useCountBooksByStatus(status: 'wishlist' | 'reading' | 'done') {
  return useQuery<ICountStatusBook>({
    queryKey: ['count-books', status],
    queryFn: () => getCountStatusBooks(status),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}
