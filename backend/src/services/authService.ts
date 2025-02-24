import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseKey } from '../config/env';

const supabase = createClient(supabaseUrl, supabaseKey);

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data.user;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data.session;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  return 'Usuário deslogado';
};

export const forgotPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:3000/reset-password',
  });

  if (error) {
    throw new Error(error.message);
  }

  return 'E-mail de redefinição de senha enviado com sucesso!';
};

export const resetPassword = async (password: string) => {
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return 'Senha redefinida com sucesso!';
};
