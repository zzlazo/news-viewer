'use server';
import { FirebaseNewsRepository } from '@/infrastructure/firebase-news-repository';
import { adminDb } from '@/lib/firebase-admin';

export async function getNewsAction(page: number, lastId?: string) {
  const repo = new FirebaseNewsRepository(adminDb);
  return await repo.getNews(page, lastId);
}
