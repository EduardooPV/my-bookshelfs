'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, BookMarked, BookText, LoaderCircleIcon } from 'lucide-react';
import Image from 'next/image';
import { IGetStatusBook } from '../../services/get-status-book';

import { useCountBooksByStatus } from '@/hooks/use-count-books-by-status';
import { useBooksByStatus } from '../../hooks/use-books-by-status';

export default function Dashboard() {
  const { data: countReadingBooks, isLoading: loadingReading } = useCountBooksByStatus('reading');
  const { data: countWishlistBooks, isLoading: loadingWishlist } =
    useCountBooksByStatus('wishlist');
  const { data: countDoneBooks, isLoading: loadingDone } = useCountBooksByStatus('done');

  const { books, loading: loadingBooks } = useBooksByStatus();

  const loading = loadingReading || loadingWishlist || loadingDone || loadingBooks;

  const StatusEnum: Record<IGetStatusBook['status'], string> = {
    wishlist: 'Lista de desejo',
    reading: 'Lendo',
    done: 'Lido',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Painel</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lista de desejo</CardTitle>
            <BookMarked className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-10">
              {loadingWishlist ? (
                <div className="flex h-full items-center">
                  <span className="animate-spin">
                    <LoaderCircleIcon />
                  </span>
                </div>
              ) : (
                <div className="text-2xl font-bold">{countWishlistBooks?.count ?? '-'}</div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Livros na sua lista de leitura</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lendo atualmente</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-10">
              {loadingReading ? (
                <div className="flex h-full items-center">
                  <span className="animate-spin">
                    <LoaderCircleIcon />
                  </span>
                </div>
              ) : (
                <div className="text-2xl font-bold">{countReadingBooks?.count ?? '-'}</div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Livros em progresso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lido</CardTitle>
            <BookText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-10">
              {loadingDone ? (
                <div className="flex h-full items-center">
                  <span className="animate-spin">
                    <LoaderCircleIcon />
                  </span>
                </div>
              ) : (
                <div className="text-2xl font-bold">{countDoneBooks?.count ?? '-'}</div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Livros concluídos</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Atualizados recentemente</CardTitle>
            <CardDescription>Livros que você atualizou o status recentemente</CardDescription>
          </CardHeader>
          <CardContent>
            {loading && (
              <div className="flex h-full w-full items-center justify-center py-20">
                <span className="animate-spin">
                  <LoaderCircleIcon />
                </span>
              </div>
            )}

            {books?.length === 0 && !loading ? (
              <div className="flex h-full w-full items-center justify-center py-10">
                <p className="text-muted-foreground">Nenhum movimentado nos últimos tempos.</p>
              </div>
            ) : (
              <div
                className="max-h-[350px] space-y-8"
                style={
                  books && books.length >= 3 ? { overflowY: 'scroll', paddingRight: '1rem' } : {}
                }
              >
                {books?.map((book) => (
                  <div key={book.id} className="flex items-center gap-4">
                    <Image
                      src={book.cover || '/placeholder.svg'}
                      alt={book.title}
                      width={80}
                      height={130}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1 space-y-1">
                      <p className="font-medium leading-none">{book.title}</p>
                      <p className="text-muted-foreground">{book.author}</p>
                      <p className="pt-2 text-sm text-muted-foreground">
                        {StatusEnum[book.status]}
                      </p>
                    </div>
                    <div>
                      {book.status === 'wishlist' && (
                        <BookMarked className="h-6 w-6 text-muted-foreground" />
                      )}
                      {book.status === 'reading' && (
                        <BookOpen className="h-6 w-6 text-muted-foreground" />
                      )}
                      {book.status === 'done' && (
                        <BookText className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
