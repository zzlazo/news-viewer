import { z } from 'zod';

const serverEnvSchema = z.object({
  FIREBASE_PROJECT_ID: z.string().min(1),
  FIREBASE_CLIENT_EMAIL: z.string().email(),
  FIREBASE_PRIVATE_KEY: z
    .string()
    .min(1)
    .transform((val) => val.replace(/\\n/g, '\n')),
});

if (typeof window !== 'undefined') {
  throw new Error('❌ serverEnv should only be used on the server side!');
}

const parsed = serverEnvSchema.safeParse({
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
});

if (!parsed.success) {
  console.error(
    '❌ Invalid server environment variables:',
    z.treeifyError(parsed.error),
  );
  throw new Error('Invalid server environment variables');
}

export const serverEnv = parsed.data;
