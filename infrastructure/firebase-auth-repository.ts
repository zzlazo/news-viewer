'use client';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  UserCredential,
  Auth,
  onAuthStateChanged,
  signInAnonymously,
} from 'firebase/auth';
import { AuthRepository } from '@/domain/repositories/auth-repository';
import { AuthenticatedUser } from '@/domain/models/auth-models';
import { FirebaseError } from 'firebase/app';

const mapFirebaseUser = (firebaseUser: User): AuthenticatedUser => ({
  id: firebaseUser.uid,
  email: firebaseUser.email ?? '',
  name: firebaseUser.displayName ?? '',
});

export class FirebaseAuthRepository implements AuthRepository {
  constructor(private readonly auth: Auth) {}

  async signIn(email: string, password: string): Promise<AuthenticatedUser> {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password,
      );
      return mapFirebaseUser(userCredential.user);
    } catch (error: unknown) {
      this.handleError(error, 'Sign-In');
    }
  }

  async signInAnonymously(): Promise<AuthenticatedUser> {
    try {
      const userCredential: UserCredential = await signInAnonymously(this.auth);
      return mapFirebaseUser(userCredential.user);
    } catch (error: unknown) {
      this.handleError(error, 'Guest-Login');
    }
  }

  async signUp(email: string, password: string, name: string): Promise<void> {
    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(this.auth, email, password);

      await updateProfile(userCredential.user, {
        displayName: name,
      });
    } catch (error: unknown) {
      this.handleError(error, 'SignUp');
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error: unknown) {
      this.handleError(error, 'SignOut');
    }
  }

  onAuthStateChanged(
    callback: (user: AuthenticatedUser | null) => void,
  ): () => void {
    return onAuthStateChanged(this.auth, (firebaseUser) => {
      if (firebaseUser) {
        callback(mapFirebaseUser(firebaseUser));
      } else {
        callback(null);
      }
    });
  }

  private handleError(error: unknown, context: string): never {
    if (error instanceof FirebaseError) {
      throw new Error(`[${context}] ${error.code}: ${error.message}`);
    }

    if (error instanceof Error) {
      throw new Error(`[${context}] ${error.message}`);
    }

    throw new Error(`[${context}] An unknown error occurred`);
  }
}
