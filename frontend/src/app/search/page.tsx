'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { BookMarked, BookOpen, BookText, SearchIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock search function
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      setIsSearching(true);

      // Simulate API call delay
      setTimeout(() => {
        // This would normally call an API
        setSearchResults([
          {
            id: 1,
            title: 'Project Hail Mary',
            author: 'Andy Weir',
            cover: '/placeholder.svg?height=300&width=200',
            publishedDate: '2021-05-04',
            genres: ['Science Fiction', 'Space', 'Adventure'],
            status: null,
          },
          {
            id: 2,
            title: 'The Martian',
            author: 'Andy Weir',
            cover: '/placeholder.svg?height=300&width=200',
            publishedDate: '2014-02-11',
            genres: ['Science Fiction', 'Space', 'Adventure'],
            status: 'read',
          },
          {
            id: 3,
            title: 'Artemis',
            author: 'Andy Weir',
            cover: '/placeholder.svg?height=300&width=200',
            publishedDate: '2017-11-14',
            genres: ['Science Fiction', 'Space', 'Adventure'],
            status: 'want-to-read',
          },
          {
            id: 4,
            title: 'The Midnight Library',
            author: 'Matt Haig',
            cover: '/placeholder.svg?height=300&width=200',
            publishedDate: '2020-08-13',
            genres: ['Fiction', 'Fantasy', 'Contemporary'],
            status: 'reading',
          },
          {
            id: 5,
            title: 'Dune',
            author: 'Frank Herbert',
            cover: '/placeholder.svg?height=300&width=200',
            publishedDate: '1965-08-01',
            genres: ['Science Fiction', 'Fantasy'],
            status: null,
          },
          {
            id: 6,
            title: 'The Song of Achilles',
            author: 'Madeline Miller',
            cover: '/placeholder.svg?height=300&width=200',
            publishedDate: '2011-09-20',
            genres: ['Historical Fiction', 'Fantasy', 'Mythology'],
            status: null,
          },
        ]);
        setIsSearching(false);
      }, 1000);
    }
  };

  const updateBookStatus = (bookId: number, status: string) => {
    // This would normally update the book status in the database
    console.log(`Updating book ${bookId} to status: ${status}`);

    // Update local state to reflect the change
    setSearchResults((prevResults) =>
      prevResults.map((book) => (book.id === bookId ? { ...book, status } : book)),
    );
  };

  return (
    <div className="container mx-auto max-w-6xl py-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Search Books</h1>
          <p className="mt-1 text-muted-foreground">Find books to add to your collection</p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by title, author, or genre..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={isSearching}>
            {isSearching ? 'Searching...' : 'Search'}
          </Button>
        </form>

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {searchResults.map((book) => (
              <Card key={book.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="relative h-[150px] w-[100px] flex-shrink-0">
                      <Image
                        src={book.cover || '/placeholder.svg'}
                        alt={book.title}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-semibold">
                          <Link href={`/dashboard/book/${book.id}`} className="hover:underline">
                            {book.title}
                          </Link>
                        </h3>
                        <p className="text-sm text-muted-foreground">{book.author}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{book.publishedDate}</p>

                        <div className="mt-2 flex flex-wrap gap-1">
                          {book.genres.map((genre: string) => (
                            <span
                              key={genre}
                              className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold transition-colors"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3">
                        {book.status === 'want-to-read' && (
                          <div className="flex items-center gap-1 text-sm">
                            <BookMarked className="h-4 w-4 text-primary" />
                            <span>Want to Read</span>
                          </div>
                        )}
                        {book.status === 'reading' && (
                          <div className="flex items-center gap-1 text-sm">
                            <BookOpen className="h-4 w-4 text-primary" />
                            <span>Currently Reading</span>
                          </div>
                        )}
                        {book.status === 'read' && (
                          <div className="flex items-center gap-1 text-sm">
                            <BookText className="h-4 w-4 text-primary" />
                            <span>Read</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/book/${book.id}`}>View Details</Link>
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm">
                          {book.status ? 'Change Status' : 'Add to Library'}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuItem onClick={() => updateBookStatus(book.id, 'want-to-read')}>
                          <BookMarked className="mr-2 h-4 w-4" />
                          <span>Want to Read</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateBookStatus(book.id, 'reading')}>
                          <BookOpen className="mr-2 h-4 w-4" />
                          <span>Currently Reading</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateBookStatus(book.id, 'read')}>
                          <BookText className="mr-2 h-4 w-4" />
                          <span>Read</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed">
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <SearchIcon className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No books found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {searchQuery
                  ? 'Try searching with different keywords'
                  : 'Search for books by title, author, or genre'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
