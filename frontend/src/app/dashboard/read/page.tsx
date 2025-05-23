'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, BookText, LoaderCircleIcon, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useBooksByStatus } from '@/hooks/use-books-by-status';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Read() {
  const { books, loading, updateBookStatus, deleteBookStatus } = useBooksByStatus('done');

  return (
    <div className="flex h-full flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
            <BookText className="h-6 w-6" />
            Lido
          </h1>
          <p className="text-muted-foreground">Livros que você terminou de ler</p>
        </div>
      </div>

      <div className="flex-1">
        {loading && (
          <div className="flex h-full w-full items-center justify-center">
            <span className="animate-spin">
              <LoaderCircleIcon />
            </span>
          </div>
        )}

        {books?.length === 0 ? (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-muted-foreground">Nenhum livro na lista de lidos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books?.map((book) => (
              <Card key={book.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-[2/3] w-full overflow-hidden">
                    <Image
                      src={book.cover || '/placeholder.svg'}
                      alt={book.title}
                      fill
                      className="object-cover transition-all hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="truncate font-semibold">{book.title}</h3>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Finalizado em: {new Date(book.completion_at).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="flex w-full items-center justify-center"
                      >
                        <Link className="flex-1" href={`/dashboard/book/${book.id}`}>
                          Ver detalhes
                        </Link>
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" className="w-10">
                            ...
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                          <DropdownMenuItem
                            onClick={() => updateBookStatus(book.book_id, 'wishlist')}
                          >
                            <BookOpen className="mr-2 h-4 w-4" />
                            <span>Lista de desejo</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => updateBookStatus(book.book_id, 'reading')}
                          >
                            <BookText className="mr-2 h-4 w-4" />
                            <span>Lendo atualmente</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteBookStatus(book.book_id)}>
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Remover da lista</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
