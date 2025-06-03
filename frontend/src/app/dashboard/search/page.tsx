'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { BookMarked, BookOpen, BookText, LoaderCircleIcon, SearchIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IBook, searchBooks } from '../../../services/search-books';
import { useBooksByStatus } from '../../../hooks/use-books-by-status';
import { useInfiniteScroll } from '../../../hooks/use-infinite-scroll';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<IBook[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [lastQuery, setLastQuery] = useState('');
  const { updateBookStatus, actionLoading } = useBooksByStatus();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      try {
        setIsSearching(true);
        setSearchResults([]);

        const response = await searchBooks(searchQuery, 1, 30);

        setLastQuery(searchQuery);
        setSearchResults(response.books);
        setTotalPages(response.totalPages);
        setPage(response.page + 1);
        setIsSearching(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setIsSearching(false);
      } finally {
        setIsSearching(false);
        setSearchQuery('');
      }
    }
  };

  const fetchMore = async () => {
    if (isSearching || page > totalPages) return;
    setIsSearching(true);
    const response = await searchBooks(lastQuery, page, 20);
    setSearchResults((prev) => [...prev, ...response.books]);
    setPage((prev) => prev + 1);
    setIsSearching(false);
  };

  useInfiniteScroll(fetchMore, page <= totalPages, isSearching);

  return (
    <div className="mx-auto h-full">
      <div className="flex h-full flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Buscar livros</h1>
          <p className="mt-1 text-muted-foreground">Encontre livros para adicionar à sua coleção</p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Pesquise por títulos..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={isSearching} className="w-20">
            {isSearching ? (
              <span className="animate-spin">
                <LoaderCircleIcon />
              </span>
            ) : (
              'Buscar'
            )}
          </Button>
        </form>

        {searchResults.length === 0 && isSearching && (
          <div className="flex-1">
            <div className="flex h-full w-full items-center justify-center">
              <span className="animate-spin">
                <LoaderCircleIcon />
              </span>
            </div>
          </div>
        )}

        {searchResults.length === 0 && !isSearching ? (
          <div className="flex h-[400px] flex-1 items-center justify-center rounded">
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <SearchIcon className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Nenhum livro encontrado</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {searchQuery
                  ? 'Tente pesquisar com palavras-chave diferentes'
                  : 'Pesquise livros por títulos'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {searchResults.map((book, index) => (
              <Card key={index} className="w-full overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col">
                    <div className="relative aspect-[2/3] w-full overflow-hidden">
                      <Image
                        src={book.cover || '/placeholder.svg'}
                        alt={book.title}
                        fill
                        className="object-cover transition-all hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-4">
                      <div>
                        <h3 className="truncate font-semibold">
                          <Link href={`/dashboard/book/${book.key}`} className="hover:underline">
                            {book.title}
                          </Link>
                        </h3>
                        <p className="text-sm text-muted-foreground">{book.author}</p>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="flex w-full items-center justify-center"
                          disabled={!!actionLoading}
                          onClick={() => updateBookStatus(book.key, 'wishlist')}
                        >
                          <p>Lista de desejo</p>
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" className="w-10">
                              {actionLoading === book.key ? (
                                <span className="animate-spin">
                                  <LoaderCircleIcon />
                                </span>
                              ) : (
                                '...'
                              )}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[200px]">
                            <DropdownMenuItem
                              onClick={() => updateBookStatus(book.key, 'wishlist')}
                            >
                              <BookMarked className="mr-2 h-4 w-4" />
                              <span>Lista de desejo</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateBookStatus(book.key, 'reading')}>
                              <BookOpen className="mr-2 h-4 w-4" />
                              <span>Lendo atualmente</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateBookStatus(book.key, 'done')}>
                              <BookText className="mr-2 h-4 w-4" />
                              <span>Lido</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div
          className={`flex-1 py-10 ${searchResults.length !== 0 && isSearching ? 'flex' : 'hidden'}`}
        >
          <div className="flex h-full w-full items-center justify-center">
            <span className="animate-spin">
              <LoaderCircleIcon />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
