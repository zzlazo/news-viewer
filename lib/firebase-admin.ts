import { serverEnv } from './env-server';
import * as admin from 'firebase-admin';
import { publicEnv } from '@/lib/env';

if (publicEnv.NEXT_PUBLIC_FIREBASE_IS_EMULATOR) {
  process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
  process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: serverEnv.FIREBASE_PROJECT_ID,
      clientEmail: serverEnv.FIREBASE_CLIENT_EMAIL,
      privateKey: serverEnv.FIREBASE_PRIVATE_KEY,
    }),
  });
}

export const adminDb = admin.firestore();
