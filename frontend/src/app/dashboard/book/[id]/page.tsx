'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { BookOpen, BookText, BookMarked, ArrowLeft, Check, LoaderCircleIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { httpService } from '@/utils/http-service';
import { changeStatusBook } from '@/services/change-status-book';
import { toast } from '@/hooks/use-toast';

interface IBookDetail {
  key: string;
  title: string;
  author: string;
  cover: string | null;
  description: string;
}

type BookStatus = 'wishlist' | 'reading' | 'done';

export default function BookDetail({ params }: { params: { id: string } }) {
  const [book, setBook] = useState<IBookDetail | null>(null);
  const [bookStatus, setBookStatus] = useState<BookStatus>('wishlist');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    httpService(`/book/${params.id}`)
      .then((data) => setBook(data.book))
      .catch(() =>
        toast({ variant: 'error', description: 'Erro ao carregar livro.' }),
      )
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleSaveStatus = async () => {
    try {
      setSaving(true);
      await changeStatusBook(params.id, bookStatus);
      toast({ variant: 'success', description: 'Status atualizado com sucesso!' });
    } catch {
      toast({ variant: 'error', description: 'Erro ao atualizar status.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center py-20">
        <span className="animate-spin">
          <LoaderCircleIcon />
        </span>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Link>
        </Button>
        <p className="text-muted-foreground">Livro não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/search">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">{book.title}</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="sticky top-20 space-y-4">
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
              <Image
                src={book.cover || '/placeholder.svg'}
                alt={book.title}
                fill
                className="object-cover"
              />
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Status do livro</CardTitle>
                <CardDescription>Atualize seu status de leitura</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={bookStatus}
                  onValueChange={(v) => setBookStatus(v as BookStatus)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="wishlist" id="wishlist" />
                    <Label
                      htmlFor="wishlist"
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <BookMarked className="h-4 w-4" />
                      Lista de desejo
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="reading" id="reading" />
                    <Label
                      htmlFor="reading"
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <BookOpen className="h-4 w-4" />
                      Lendo
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="done" id="done" />
                    <Label htmlFor="done" className="flex cursor-pointer items-center gap-2">
                      <BookText className="h-4 w-4" />
                      Lido
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-1" onClick={handleSaveStatus} disabled={saving}>
                  {saving ? (
                    <span className="animate-spin">
                      <LoaderCircleIcon className="h-4 w-4" />
                    </span>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      Salvar
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Autor</p>
            <p className="font-medium">{book.author}</p>
          </div>

          {book.description && (
            <div>
              <h2 className="text-xl font-semibold">Descrição</h2>
              <p className="mt-2 text-muted-foreground">{book.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
