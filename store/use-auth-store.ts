import { FirebaseAuthRepository } from '@/infrastructure/firebase-auth-repository';
import { AuthenticatedUser } from '@/domain/models/auth-models';
import { deleteCookie, setCookie } from 'cookies-next';
import { auth } from '@/lib/firebase';
import { create } from 'zustand';

const authRepo = new FirebaseAuthRepository(auth);

interface AuthState {
  user: AuthenticatedUser | null;
  isLoading: boolean;
  initialize: () => () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signInAnonymously: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  initialize: () => {
    return authRepo.onAuthStateChanged((user) => {
      if (user) {
        setCookie('session', 'true', { maxAge: 60 * 60 * 24 });
        set({ user, isLoading: false });
      } else {
        deleteCookie('session');
        set({ user: null, isLoading: false });
      }
    });
  },

  signIn: async (email: string, password: string) => {
    set({ isLoading: true });
    const user = await authRepo.signIn(email, password);
    setCookie('session', 'true', { maxAge: 60 * 60 * 24 });
    set({ user, isLoading: false });
  },

  signInAnonymously: async () => {
    set({ isLoading: true });
    const user = await authRepo.signInAnonymously();
    setCookie('session', 'true', { maxAge: 60 * 60 * 24 });
    set({ user, isLoading: false });
  },

  signOut: async () => {
    await authRepo.signOut();
    deleteCookie('session');
    set({ user: null });
  },
}));
