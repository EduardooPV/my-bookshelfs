'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { BookOpen, ArrowLeft, Mail, LoaderCircleIcon } from 'lucide-react';
import { ToggleEye } from '../../../components/common/ToggleEye';
import { useUserAuth } from '../../../hooks/use-user-auth';

export default function ForgotPassword() {
  const [password, setPassword] = useState('');
  const { setSession, resetPassword, loading } = useUserAuth();

  useEffect(() => {
    setSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    resetPassword(password);
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
