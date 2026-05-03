import { NewsEntity, NewsEntitySchema } from '@/domain/models/news-models';
import { NewsRepository } from '@/domain/repositories/news-repository';
import { Firestore } from 'firebase-admin/firestore';

export class FirebaseNewsRepository implements NewsRepository {
  constructor(private db: Firestore) {}

  private get newsCol() {
    return this.db.collection('news');
  }

  async getNews(range: number, lastId?: string): Promise<NewsEntity[]> {
    let query = this.newsCol.limit(range);

    if (lastId) {
      const lastDoc = await this.newsCol.doc(lastId).get();
      if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
      }
    }

    const snapshot = await query.get();
    return snapshot.docs.map((doc) =>
      NewsEntitySchema.parse({
        id: doc.id,
        ...doc.data(),
      }),
    );
  }
}
