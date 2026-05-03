import { AuthenticatedUser } from '@/domain/models/auth-models';

export interface AuthRepository {
  signIn(email: string, password: string): Promise<AuthenticatedUser>;
  signOut(): Promise<void>;
  signInAnonymously(): Promise<AuthenticatedUser>;
  onAuthStateChanged(
    callback: (user: AuthenticatedUser | null) => void,
  ): () => void;
}
