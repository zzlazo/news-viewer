// app/page.tsx
import { FirebaseNewsRepository } from '@/infrastructure/firebase-news-repository';
import NewsFeedContainer from '@/components/features/NewsFeedContainer';
import { adminDb } from '@/lib/firebase-admin';

export default async function Home() {
  const repo = new FirebaseNewsRepository(adminDb);

  const initialNews = await repo.getNews(10);

  return <NewsFeedContainer initialData={initialNews} />;
}
