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
            Lendo atualmente
          </h1>
          <p className="text-muted-foreground">Livros que você está lendo atualmente</p>
        </div>
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
                      Marcar como lido
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="truncate font-semibold">{book.title}</h3>
                <p className="text-sm text-muted-foreground">{book.author}</p>
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <span>Inicio em: {new Date(book.startedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
