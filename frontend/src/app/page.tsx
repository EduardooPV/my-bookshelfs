import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen, BookText, BookMarked, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl">My bookshelfs</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/auth/signin">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Cadastrar</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[minmax(400px,_580px)_1fr] lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Acompanhe sua jornada de leitura
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Organize seus livros, compartilhe seus pensamentos e descubra novas leituras com
                    nossa moderna plataforma de controle de livros.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/auth/signup">
                    <Button size="lg" className="gap-1.5">
                      Cadastrar
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  <div className="flex flex-col items-center gap-2 rounded-lg bg-muted p-4 md:p-6">
                    <BookMarked className="h-10 w-10 text-primary" />
                    <h3 className="text-xl font-bold">Lista de desejo</h3>
                    <p className="text-center text-sm text-muted-foreground">
                      Acompanhe os livros que você deseja ler no futuro.
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-lg bg-muted p-4 md:p-6">
                    <BookOpen className="h-10 w-10 text-primary" />
                    <h3 className="text-center text-xl font-bold">Lendo atualmente</h3>
                    <p className="text-center text-sm text-muted-foreground">
                      Acompanhe seu progresso nos livros que você está lendo no momento
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-lg bg-muted p-4 md:p-6">
                    <BookText className="h-10 w-10 text-primary" />
                    <h3 className="text-xl font-bold">Lido</h3>
                    <p className="text-center text-sm text-muted-foreground">
                      Revise e classifique os livros que você terminou de ler
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Features
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Tudo o que você precisa para gerenciar sua vida de leitura em um só lugar
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                <div className="rounded-full bg-primary p-2 text-primary-foreground">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Organize seus livros</h3>
                <p className="text-center text-muted-foreground">
                  Organize seus livros nas categorias Lista de desejo, Lendo atualmente e Lidos
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                <div className="rounded-full bg-primary p-2 text-primary-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M17 6.1H3" />
                    <path d="M21 12.1H3" />
                    <path d="M15.1 18H3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Sistema de classificação</h3>
                <p className="text-center text-muted-foreground">
                  Avalie e comente livros que você leu para compartilhar suas ideias com outras
                  pessoas
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                <div className="rounded-full bg-primary p-2 text-primary-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Pesquisa inteligente</h3>
                <p className="text-center text-muted-foreground">
                  Encontre livros por título, autor ou gênero com nosso sistema de busca inteligente
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <span className="text-lg font-semibold">My bookshelfs</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; 2025 My bookshelfs. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
