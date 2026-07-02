import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen, Mail, ArrowLeft } from 'lucide-react';

export default function CheckEmail() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex min-h-screen max-w-md flex-col items-center justify-center py-12">
        <Link href="/auth/signin" className="absolute left-4 top-4 md:left-8 md:top-8">
          <Button variant="ghost" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </Link>

        <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 sm:w-[350px]">
          <BookOpen className="h-10 w-10" />

          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Verifique seu e-mail</h1>
            <p className="text-sm text-muted-foreground">
              Enviamos um link de confirmação para o seu e-mail. Clique no link para ativar sua
              conta e acessar o dashboard.
            </p>
          </div>

          <div className="flex w-full items-center justify-center rounded-lg border border-dashed p-6">
            <div className="flex flex-col items-center gap-2 text-center text-muted-foreground">
              <Mail className="h-8 w-8" />
              <p className="text-sm">Não recebeu o e-mail? Verifique sua caixa de spam.</p>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Já tem uma conta?{' '}
            <Link href="/auth/signin" className="underline underline-offset-4 hover:text-primary">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
