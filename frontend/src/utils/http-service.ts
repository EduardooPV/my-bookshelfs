import { toast } from '../hooks/use-toast';

export const httpService = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
  });

  const data = await response.json(); // lê o corpo só uma vez

  if (response.status === 401) {
    toast({
      variant: 'error',
      description: 'Usuário não autenticado',
    });

    window.location.href = '/auth/signin';
  }

  if (!response.ok) {
    throw new Error(data.error || 'Erro ao buscar dados');
  }

  return data;
};
