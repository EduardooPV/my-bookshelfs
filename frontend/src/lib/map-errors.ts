import { AuthError } from '@supabase/supabase-js';

export function mapSupabaseError(error?: AuthError | null): string {
  if (!error) return 'Ocorreu um erro inesperado. Tente novamente.';

  switch (error.message) {
    case 'Invalid login credentials':
      return 'Credenciais inválidas. Verifique seu e-mail e senha.';
    case 'User already registered':
      return 'Este e-mail já está cadastrado.';
    case 'Email not confirmed':
      return 'E-mail ainda não confirmado. Verifique sua caixa de entrada.';
    case 'User not found':
      return 'Usuário não encontrado.';
    case 'Invalid email or password':
      return 'E-mail ou senha incorretos.';
    case 'Password should be at least 6 characters':
      return 'A senha deve conter pelo menos 6 caracteres.';
    case 'Token has expired or is invalid':
      return 'Link expirado ou inválido. Solicite um novo.';
    case 'Email not found':
      return 'E-mail não encontrado. Verifique se digitou corretamente.';
    case 'Signups not allowed for this instance':
      return 'Cadastro desativado. Contate o administrador.';
    case 'Password should be at least 6 characters.':
      return 'A senha deve ter pelo menos 6 caracteres';
    case 'Invalid credentials':
      return 'Senha ou email inválidos.';

    // fallback genérico
    default:
      return 'Erro ao processar requisição. Tente novamente.';
  }
}
