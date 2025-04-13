import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Reading() {
  // Sample data for books in "Currently Reading" category
  const books = [
    {
      id: 1,
      title: 'Atomic Habits',
      author: 'James Clear',
      cover: '/placeholder.svg?height=300&width=200',
      startedDate: '2023-10-15',
    },
    {
      id: 2,
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      cover: '/placeholder.svg?height=300&width=200',
      startedDate: '2023-11-05',
    },
    {
      id: 3,
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      cover: '/placeholder.svg?height=300&width=200',
      startedDate: '2023-11-20',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
            <BookOpen className="h-6 w-6" />
            Currently Reading
          </h1>
          <p className="text-muted-foreground">Books you&apos;re currently reading</p>
        </div>
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          Add Book
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
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
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">
                      Started on {new Date(book.startedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/book/${book.id}`}>View Details</Link>
                </Button>
                <Button size="sm">Mark as Read</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
