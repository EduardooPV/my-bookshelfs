import { supabase } from '../../config/database';
import dotenv from 'dotenv';
dotenv.config();

const signUp = async (email: string, password: string) => {
  const frontendUrl = process.env.FRONTEND_URL ?? 'https://my-bookshelfs-frontend.vercel.app';

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${frontendUrl}/auth/callback`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return {
    user: data.user,
    emailConfirmationPending: !data.user?.email_confirmed_at,
  };
};

const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user?.email_confirmed_at) {
    throw new Error('Por favor, confirme seu e-mail antes de fazer login.');
  }

  return data.session;
};

const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  return 'Usuário deslogado';
};

const forgotPassword = async (email: string) => {
  const frontendUrl = process.env.FRONTEND_URL ?? 'https://my-bookshelfs-frontend.vercel.app';
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${frontendUrl}/auth/reset-password`,
  });

  if (error) {
    throw new Error(error.message);
  }

  return 'E-mail de redefinição de senha enviado com sucesso!';
};

const resetPassword = async (password: string) => {
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return 'Senha redefinida com sucesso!';
};

const validateAndReturnToken = async (access_token: string) => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(access_token);

  if (error || !user) {
    throw new Error('Token inválido ou expirado');
  }

  return access_token;
};

export { signUp, signIn, signOut, forgotPassword, resetPassword, validateAndReturnToken };
