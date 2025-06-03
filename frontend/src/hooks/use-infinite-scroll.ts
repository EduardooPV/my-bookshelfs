import { useEffect, useRef, useCallback } from 'react';

export function useInfiniteScroll(
  callback: () => void,
  canLoadMore: boolean,
  isLoading: boolean,
  offset = 300,
) {
  const fetching = useRef(false);

  const handleScroll = useCallback(() => {
    if (!canLoadMore || isLoading || fetching.current) return;
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - offset;
    if (scrollPosition >= threshold) {
      fetching.current = true;
      callback();
    }
  }, [callback, canLoadMore, isLoading, offset]);

  useEffect(() => {
    if (!canLoadMore) return;
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, canLoadMore]);

  useEffect(() => {
    if (!isLoading) fetching.current = false;
  }, [isLoading]);
}
