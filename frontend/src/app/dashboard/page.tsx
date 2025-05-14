'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, BookMarked, BookText, Plus, LoaderCircleIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getCountStatusBooks, ICountStatusBook } from '@/services/count-status-book';
import { getStatusBook, IGetStatusBook } from '../../services/get-status-book';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [countReadingBooks, setCountReadingBooks] = useState<ICountStatusBook | null>(null);
  const [countWishlistBooks, setCountWishlistBooks] = useState<ICountStatusBook | null>(null);
  const [countDoneBooks, setCountDoneBooks] = useState<ICountStatusBook | null>(null);
  const [books, setBooks] = useState<IGetStatusBook[] | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [
        countReadingBooksResponse,
        countWishlistBooksResponse,
        countDoneBooksResponse,
        booksResponse,
      ] = await Promise.all([
        getCountStatusBooks('reading'),
        getCountStatusBooks('wishlist'),
        getCountStatusBooks('done'),
        getStatusBook(),
      ]);
      setCountReadingBooks(countReadingBooksResponse);
      setCountWishlistBooks(countWishlistBooksResponse);
      setCountDoneBooks(countDoneBooksResponse);
      setBooks(booksResponse);
    } catch (error) {
      console.error('Erro ao buscar a soma dos livros lidos:', error);
    } finally {
      setLoading(false);
    }
  };
  const StatusEnum: Record<IGetStatusBook['status'], string> = {
    wishlist: 'Lista de desejo',
    reading: 'Lendo',
    done: 'Lido',
  };

  useEffect(() => {
    fetchData();
  }, []);

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
              {loading ? (
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
              {loading ? (
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
              {loading ? (
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

            {books?.length === 0 ? (
              <div className="flex h-full w-full items-center justify-center">
                <p className="text-muted-foreground">Nenhum movimentado nos últimos tempos..</p>
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
