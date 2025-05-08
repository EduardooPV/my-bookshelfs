import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookMarked, Plus } from 'lucide-react';
import Image from 'next/image';

export default function WantToRead() {
  // Sample data for books in "Want to Read" category
  const books = [
    {
      id: 1,
      title: 'The Midnight Library',
      author: 'Matt Haig',
      cover: '/placeholder.svg?height=300&width=200',
      addedDate: '2023-10-15',
    },
    {
      id: 2,
      title: 'Dune',
      author: 'Frank Herbert',
      cover: '/placeholder.svg?height=300&width=200',
      addedDate: '2023-09-22',
    },
    {
      id: 3,
      title: 'The Song of Achilles',
      author: 'Madeline Miller',
      cover: '/placeholder.svg?height=300&width=200',
      addedDate: '2023-11-05',
    },
    {
      id: 4,
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      cover: '/placeholder.svg?height=300&width=200',
      addedDate: '2023-08-30',
    },
    {
      id: 5,
      title: 'Educated',
      author: 'Tara Westover',
      cover: '/placeholder.svg?height=300&width=200',
      addedDate: '2023-10-02',
    },
    {
      id: 6,
      title: 'The Silent Patient',
      author: 'Alex Michaelides',
      cover: '/placeholder.svg?height=300&width=200',
      addedDate: '2023-11-12',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
            <BookMarked className="h-6 w-6" />
            Lista de desejo
          </h1>
          <p className="text-muted-foreground">Livros que você quer ler no futuro</p>
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
                      Começar a ler
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="truncate font-semibold">{book.title}</h3>
                <p className="text-sm text-muted-foreground">{book.author}</p>
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <span>Adicionado em: {new Date(book.addedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
