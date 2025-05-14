export const httpService = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    console.log(error);
    throw new Error(error.error || 'Erro ao buscar dados');
  }

  return response.json();
};
