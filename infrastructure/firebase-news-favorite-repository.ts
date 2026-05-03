'use client';

import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
  Firestore,
} from 'firebase/firestore';
import {
  NewsEntity,
  NewsFavorite,
  NewsFavoriteSchema,
} from '@/domain/models/news-models';

export class FirebaseNewsFavoriteRepository {
  constructor(private readonly db: Firestore) {}
  private favCol = collection(this.db, 'newsFavorites');

  subscribe(uid: string, callback: (news: NewsFavorite[]) => void) {
    const q = query(this.favCol, where('uid', '==', uid));

    return onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const rawData = doc.data({
          serverTimestamps: 'estimate',
        });

        return NewsFavoriteSchema.parse({ ...rawData, id: doc.id });
      });

      callback(data);
    });
  }

  async saveFavorite(uid: string, news: NewsEntity): Promise<void> {
    await setDoc(doc(this.favCol), {
      newsId: news.id,
      uid: uid,
      title: news.title,
      content: news.title,
      imageUrl: news.imageUrl ?? null,
    });
  }

  async removeFavorite(id: string): Promise<void> {
    await deleteDoc(doc(this.favCol, id));
  }
}
