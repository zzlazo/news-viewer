'use client';

import { FirebaseNewsFavoriteRepository } from '@/infrastructure/firebase-news-favorite-repository';
import NewsFavoriteList from '@/components/ui/NewsFavoriteList';
import { useNewsFavorites } from '@/hooks/use-news-favorites';
import { useMemo, useCallback } from 'react';
import { db } from '@/lib/firebase';

export default function NewsFavoritesContainer() {
  const repo = useMemo(() => new FirebaseNewsFavoriteRepository(db), []);

  const { favorites, removeFavorite, isLoading } = useNewsFavorites(repo);

  const handleToggleFavorite = useCallback(
    async (id: string) => {
      await removeFavorite(id);
    },
    [removeFavorite],
  );

  return (
    <NewsFavoriteList
      items={favorites}
      loading={isLoading}
      isFavorite={(_) => true}
      onToggleFavorite={handleToggleFavorite}
    />
  );
}
