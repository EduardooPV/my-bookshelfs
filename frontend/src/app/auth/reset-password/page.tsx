/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { BookOpen, ArrowLeft, Mail, LoaderCircleIcon } from 'lucide-react';
import { toast } from '../../../hooks/use-toast';
import { supabase } from '../../../lib/supabase';
import { useRouter } from 'next/navigation';
import { ToggleEye } from '../../../components/common/ToggleEye';
import { mapSupabaseError } from '../../../lib/map-errors';

export default function ForgotPassword() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', '?'));
    const access_token = params.get('access_token');
    const refresh_token = params.get('refresh_token');

    if (access_token && refresh_token) {
      supabase.auth
        .setSession({
          access_token,
          refresh_token,
        })
        .then(({ error }) => {
          if (error) {
            toast({
              variant: 'success',
              description: 'Erro ao definir sessão',
            });
          }

          setLoading(false);
        });
    } else {
      toast({
        variant: 'error',
        description: 'Tokens não encontrados na URL',
      });
      setLoading(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        const message = mapSupabaseError(error);
        toast({
          variant: 'error',
          description: message,
        });
      } else {
        toast({
          variant: 'success',
          description: 'Senha redefinida com sucesso!',
        });

        router.push('/auth/signin');
      }
    } catch (err: any) {
      const message = mapSupabaseError(err.error ?? err);
      toast({
        variant: 'error',
        description: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex min-h-screen max-w-md flex-col items-center justify-center py-12">
        <Link href="/auth/signin" className="absolute left-4 top-4 md:left-8 md:top-8">
          <Button variant="ghost" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <div className="flex justify-center">
              <BookOpen className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Trocar de senha</h1>
            <p className="text-sm text-muted-foreground">Digite sua nova senha</p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-4">
              <Label htmlFor="email">Senha</Label>
              <ToggleEye password={password} setPassword={setPassword} />
            </div>
            <Button type="submit" className="w-full">
              {loading ? (
                <span className="animate-spin">
                  <LoaderCircleIcon />
                </span>
              ) : (
                'Redefinir senha'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
