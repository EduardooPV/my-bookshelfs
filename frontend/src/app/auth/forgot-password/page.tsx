'use client';

import type React from 'react';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, ArrowLeft, Mail, LoaderCircleIcon } from 'lucide-react';
import { useUserAuth } from '../../../hooks/use-user-auth';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const { submitted, setSubmitted, loading, forgotPassword } = useUserAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    forgotPassword(email);
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
          {!submitted ? (
            <>
              <div className="flex flex-col space-y-2 text-center">
                <div className="flex justify-center">
                  <BookOpen className="h-8 w-8" />
                </div>
                <h1 className="text-2xl font-semibold tracking-tight">Esqueceu sua senha</h1>
                <p className="text-sm text-muted-foreground">
                  Digite seu endereço de e-mail e nós lhe enviaremos um link para redefinir sua
                  senha
                </p>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-6">
                <div className="grid gap-4">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  {loading ? (
                    <span className="animate-spin">
                      <LoaderCircleIcon />
                    </span>
                  ) : (
                    'Enviar link de redefinição'
                  )}
                </Button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium">Verifique seu email</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Enviamos um link para redefinição de senha para {email}
                </p>
              </div>
              <Button variant="outline" className="w-full" onClick={() => setSubmitted(false)}>
                Enviar novamente
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
