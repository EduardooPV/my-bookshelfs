import { supabase } from '../../config/database';
import dotenv from 'dotenv';
dotenv.config();

const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data.user;
};

const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
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
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://my-bookshelfs-frontend.vercel.app/auth/reset-password',
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

export { signUp, signIn, signOut, forgotPassword, resetPassword };
