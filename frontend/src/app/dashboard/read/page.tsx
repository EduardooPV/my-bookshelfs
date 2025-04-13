import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookText, Plus, Star } from 'lucide-react';
import Image from 'next/image';

export default function Read() {
  // Sample data for books in "Read" category
  const books = [
    {
      id: 1,
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      cover: '/placeholder.svg?height=300&width=200',
      rating: 5,
      dateFinished: '2023-10-20',
    },
    {
      id: 2,
      title: 'The Martian',
      author: 'Andy Weir',
      cover: '/placeholder.svg?height=300&width=200',
      rating: 4,
      dateFinished: '2023-09-15',
    },
    {
      id: 3,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      cover: '/placeholder.svg?height=300&width=200',
      rating: 4,
      dateFinished: '2023-08-05',
    },
    {
      id: 4,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      cover: '/placeholder.svg?height=300&width=200',
      rating: 5,
      dateFinished: '2023-07-22',
    },
    {
      id: 5,
      title: '1984',
      author: 'George Orwell',
      cover: '/placeholder.svg?height=300&width=200',
      rating: 5,
      dateFinished: '2023-06-10',
    },
    {
      id: 6,
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      cover: '/placeholder.svg?height=300&width=200',
      rating: 3,
      dateFinished: '2023-05-18',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
            <BookText className="h-6 w-6" />
            Read
          </h1>
          <p className="text-muted-foreground">Books you've finished reading</p>
        </div>
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          Add Book
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => (
          <Card key={book.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-[2/3] w-full">
                <Image
                  src={book.cover || '/placeholder.svg'}
                  alt={book.title}
                  fill
                  className="object-cover transition-all hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity hover:opacity-100">
                  <div className="space-y-1 text-white">
                    <h3 className="font-semibold">{book.title}</h3>
                    <p className="text-sm">{book.author}</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="secondary" className="w-full">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="truncate font-semibold">{book.title}</h3>
                <p className="text-sm text-muted-foreground">{book.author}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < book.rating
                            ? 'fill-yellow-500 text-yellow-500'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(book.dateFinished).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
