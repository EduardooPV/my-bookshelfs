'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookMarked, LoaderCircleIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getWishlistBooks, IWishlistBooks } from '../../../services/list-wishlist';
import { changeStatusBook } from '../../../services/change-status-book';

export default function WantToRead() {
  const [loading, setLoading] = useState(true);
  const [loadingStartReading, setLoadingStartReading] = useState(false);
  const [wishlistBooks, setWishlistBooks] = useState<IWishlistBooks[] | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const getWishlistBooksResponse = await getWishlistBooks();
      setWishlistBooks(getWishlistBooksResponse);
    } catch (error) {
      console.error('Erro ao buscar a lista de desejos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartReadingBook = async (bookId: string) => {
    try {
      setLoadingStartReading(true);

      const changeStatusBookResponse = await changeStatusBook(bookId, 'reading');

      if (changeStatusBookResponse) {
        fetchData();
      }
    } catch (error) {
      console.error('Erro ao iniciar a leitura do livro:', error);
    } finally {
      setLoadingStartReading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex h-full flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
            <BookMarked className="h-6 w-6" />
            Lista de desejo
          </h1>
          <p className="text-muted-foreground">Livros que você quer ler no futuro</p>
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

        {wishlistBooks?.length === 0 ? (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-muted-foreground">Nenhum livro na lista de desejos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistBooks?.map((book) => (
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
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-full"
                          onClick={() => handleStartReadingBook(book.book_id)}
                          disabled={loadingStartReading}
                        >
                          {loadingStartReading ? (
                            <LoaderCircleIcon className="animate-spin" />
                          ) : (
                            'Começar a ler'
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="truncate font-semibold">{book.title}</h3>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                    <div className="mt-2 flex items-center text-sm text-muted-foreground">
                      <span>Adicionado em: {new Date(book.updated_at).toLocaleDateString()}</span>
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
