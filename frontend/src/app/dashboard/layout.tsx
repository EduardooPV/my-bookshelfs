'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  BookMarked,
  BookText,
  Search,
  Home,
  Settings,
  LogOut,
  Moon,
  Sun,
  Menu,
  Computer,
  User,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import {
  SheetDescription,
  SheetTitle,
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
} from '@/components/ui/sheet';
import { useUserAuth } from '@/hooks/use-user-auth';
import { ACTIVE_SEARCH } from '../../utils/features-flags';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { logout } = useUserAuth();

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    setMounted(true);

    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const navigation = [
    { name: 'Inicio', href: '/dashboard', icon: Home },
    { name: 'Lista de desejo', href: '/dashboard/wishlist', icon: BookMarked },
    { name: 'Lendo Atualmente', href: '/dashboard/reading', icon: BookOpen },
    { name: 'Lido', href: '/dashboard/read', icon: BookText },
    ...(ACTIVE_SEARCH ? [{ name: 'Pesquisar', href: '/dashboard/search', icon: Search }] : []),
  ];

  const Sidebar = () => (
    <div className="flex h-full flex-col gap-2">
      <div className="flex h-12 items-center border-b px-4 md:h-16">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <BookOpen className="h-6 w-6" />
          <p>My bookshelfs</p>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start gap-2 px-2 text-sm font-medium">
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {!isMobile && (
        <div className="hidden border-r md:fixed md:inset-y-0 md:flex md:w-80 md:flex-col">
          <Sidebar />
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col md:pl-80">
        <header className="sticky top-0 z-10 mb-4 flex h-16 items-center justify-between gap-4 bg-background px-4 md:px-6">
          {/* Mobile sidebar */}
          {isMobile && (
            <Sheet>
              <SheetHeader className="sr-only">
                <SheetTitle>Sidebar</SheetTitle>
                <SheetDescription>Sidebar</SheetDescription>
              </SheetHeader>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="z-40 md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <Sidebar />
              </SheetContent>
            </Sheet>
          )}

          <div className="flex-1" />

          {/* Desktop theme and user menu */}

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  <span className="sr-only">Trocar tema</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Claro</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Escuro</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  <Computer className="mr-2 h-4 w-4" />
                  <span>Sistema</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleLogout()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
