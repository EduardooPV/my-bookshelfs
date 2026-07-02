'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
import { BookOpen, LoaderCircleIcon } from 'lucide-react';
import { API_URL } from '@/utils/config';

export default function AuthCallback() {
  const router = useRouter();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', '?'));
    const access_token = params.get('access_token');
    const refresh_token = params.get('refresh_token');

    if (!access_token || !refresh_token) {
      toast({ variant: 'error', description: 'Link de confirmação inválido.' });
      router.replace('/auth/signin');
      return;
    }

    supabase.auth.setSession({ access_token, refresh_token }).then(async ({ error }) => {
      if (error) {
        toast({ variant: 'error', description: 'Sessão expirada. Faça login novamente.' });
        router.replace('/auth/signin');
        return;
      }

      await fetch(`${API_URL}/auth/set-cookie`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_token }),
        credentials: 'include',
      });

      router.replace('/dashboard');
    });
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <BookOpen className="h-10 w-10" />
      <p className="text-muted-foreground">Confirmando sua conta...</p>
      <span className="animate-spin">
        <LoaderCircleIcon className="h-6 w-6" />
      </span>
    </div>
  );
}
