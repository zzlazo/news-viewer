'use client';

import { FirebaseNewsFavoriteRepository } from '@/infrastructure/firebase-news-favorite-repository';
import { useNewsFavorites } from '@/hooks/use-news-favorites';
import { NewsEntity } from '@/domain/models/news-models';
import { useInView } from 'react-intersection-observer';
import { useMemo, useEffect, useCallback } from 'react';
import { useNewsFeed } from '@/hooks/use-news-feed';
import NewsList from '@/components/ui/NewsList';
import { db } from '@/lib/firebase';

export default function NewsFeedContainer({
  initialData,
}: {
  initialData: NewsEntity[];
}) {
  const repo = useMemo(() => new FirebaseNewsFavoriteRepository(db), []);

  const { items, loadMore, hasMore, loading } = useNewsFeed(initialData);
  const { isFavorite, addFavorite, removeFavorite } = useNewsFavorites(repo);

  const { ref, inView } = useInView({ rootMargin: '200px' });

  const handleToggleFavorite = useCallback(
    async (newsId: string) => {
      if (isFavorite(newsId)) {
        await removeFavorite(newsId);
      } else {
        const targetNews = items.find((n) => n.id === newsId);
        if (targetNews) {
          await addFavorite(targetNews);
        }
      }
    },
    [isFavorite, removeFavorite, addFavorite, items],
  );

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMore();
    }
  }, [inView, hasMore, loading, loadMore]);

  return (
    <NewsList
      items={items}
      loading={loading}
      hasMore={hasMore}
      observerRef={ref}
      isFavorite={isFavorite}
      onToggleFavorite={handleToggleFavorite}
    />
  );
}
