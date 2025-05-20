'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

import { httpService } from '../utils/http-service';
import { mapSupabaseError } from '../lib/map-errors';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import { API_URL } from '../utils/config';

export function useUserAuth() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const signup = async (email: string, password: string) => {
    try {
      setLoading(true);

      await httpService('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      await fetch('/api/auth/signin', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      router.push('/dashboard');
    } catch (err: any) {
      const message = mapSupabaseError(err?.error ?? err);
      toast({
        variant: 'error',
        description: message,
      });
    } finally {
      setLoading(false);
    }
  };

  const signin = async (email: string, password: string) => {
    try {
      setLoading(true);

      const response = await httpService('/auth/signin', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      console.log('response hooks1', response);

      if (!response.session.access_token) {
        throw new Error('Falha ao realizar login.');
      }

      console.log('response hooks2', response);
      router.push('/dashboard');
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

  const setSession = async () => {
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
  };

  const resetPassword = async (password: string) => {
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

  const forgotPassword = async (email: string) => {
    try {
      setLoading(true);

      await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      setSubmitted(true);
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

  const logout = async () => {
    try {
      setLoading(true);

      await fetch(`api/auth/logout`, { method: 'POST', credentials: 'include' });

      router.push('/');
    } catch {
      toast({ variant: 'error', description: 'Erro ao sair.' });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    submitted,
    setSubmitted,
    signup,
    signin,
    setSession,
    resetPassword,
    forgotPassword,
    logout,
  };
}
