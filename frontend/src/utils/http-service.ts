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

  console.log('response http service1', response);

  if (response.status === 401) {
    toast({
      variant: 'error',
      description: 'Usuário não autenticado',
    });

    window.location.href = '/auth/signin';
  }

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.error || 'Erro ao buscar dados');
  }

  console.log('response http service2', await response.json());
  return await response.json();
};
