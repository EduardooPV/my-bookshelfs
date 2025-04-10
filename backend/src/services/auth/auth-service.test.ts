import {
  signUp,
  signIn,
  signOut,
  forgotPassword,
  resetPassword,
} from './auth-service';

import { createClient } from '@supabase/supabase-js';

jest.mock('@supabase/supabase-js', () => {
  const mockAuth = {
    signUp: jest.fn(),
    signInWithPassword: jest.fn(),
    signOut: jest.fn(),
    resetPasswordForEmail: jest.fn(),
    updateUser: jest.fn(),
  };

  return {
    createClient: jest.fn(() => ({
      auth: mockAuth,
    })),
  };
});

const mockAuth = (createClient as jest.Mock).mock.results[0].value.auth;

describe('Auth Service', () => {
  describe('signUp', () => {
    it('should sign up a user successfully', async () => {
      mockAuth.signUp.mockResolvedValue({
        data: { user: { id: '123', email: 'test@example.com' } },
        error: null,
      });

      const user = await signUp('test@example.com', 'password123');
      expect(user).toEqual({ id: '123', email: 'test@example.com' });
    });

    it('should throw an error if sign up fails', async () => {
      mockAuth.signUp.mockResolvedValue({
        data: null,
        error: { message: 'Sign up failed' },
      });

      await expect(signUp('test@example.com', 'password123')).rejects.toThrow(
        'Sign up failed',
      );
    });
  });

  describe('signIn', () => {
    it('should sign in a user successfully', async () => {
      mockAuth.signInWithPassword.mockResolvedValue({
        data: { session: { access_token: 'token' } },
        error: null,
      });

      const session = await signIn('test@example.com', 'password123');
      expect(session).toEqual({ access_token: 'token' });
    });

    it('should throw an error if sign in fails', async () => {
      mockAuth.signInWithPassword.mockResolvedValue({
        data: null,
        error: { message: 'Sign in failed' },
      });

      await expect(signIn('test@example.com', 'password123')).rejects.toThrow(
        'Sign in failed',
      );
    });
  });

  describe('signOut', () => {
    it('should sign out a user successfully', async () => {
      mockAuth.signOut.mockResolvedValue({
        error: null,
      });

      const result = await signOut();
      expect(result).toBe('Usuário deslogado');
    });

    it('should throw an error if sign out fails', async () => {
      mockAuth.signOut.mockResolvedValue({
        error: { message: 'Sign out failed' },
      });

      await expect(signOut()).rejects.toThrow('Sign out failed');
    });
  });

  describe('forgotPassword', () => {
    it('should send a password reset email successfully', async () => {
      mockAuth.resetPasswordForEmail.mockResolvedValue({
        error: null,
      });

      const result = await forgotPassword('test@example.com');
      expect(result).toBe(
        'E-mail de redefinição de senha enviado com sucesso!',
      );
    });

    it('should throw an error if sending reset email fails', async () => {
      mockAuth.resetPasswordForEmail.mockResolvedValue({
        error: { message: 'Reset email failed' },
      });

      await expect(forgotPassword('test@example.com')).rejects.toThrow(
        'Reset email failed',
      );
    });
  });

  describe('resetPassword', () => {
    it('should reset the password successfully', async () => {
      mockAuth.updateUser.mockResolvedValue({
        error: null,
      });

      const result = await resetPassword('newpassword123');
      expect(result).toBe('Senha redefinida com sucesso!');
    });

    it('should throw an error if resetting password fails', async () => {
      mockAuth.updateUser.mockResolvedValue({
        error: { message: 'Reset password failed' },
      });

      await expect(resetPassword('newpassword123')).rejects.toThrow(
        'Reset password failed',
      );
    });
  });
});
