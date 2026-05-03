import { FirebaseNewsFavoriteRepository } from '@/infrastructure/firebase-news-favorite-repository';
import { NewsEntity, NewsFavorite } from '@/domain/models/news-models';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useAuthStore } from '@/store/use-auth-store';

export function useNewsFavorites(repo: FirebaseNewsFavoriteRepository) {
  const uid = useAuthStore((state) => state.user?.id);

  const [favorites, setFavorites] = useState<NewsFavorite[] | null>(null);

  const isLoading = !!uid && favorites === null;
  const displayFavorites = useMemo(() => favorites ?? [], [favorites]);

  useEffect(() => {
    if (!uid) {
      return;
    }

    const unsubscribe = repo.subscribe(uid, (newsList) => {
      setFavorites(newsList);
    });

    return () => {
      unsubscribe();
      setFavorites(null);
    };
  }, [repo, uid]);

  const addFavorite = useCallback(
    async (news: NewsEntity) => {
      if (!uid) return;
      await repo.saveFavorite(uid, news);
    },
    [repo, uid],
  );

  const removeFavorite = useCallback(
    async (id: string) => {
      if (!uid) return;
      await repo.removeFavorite(id);
    },
    [repo, uid],
  );

  const isFavorite = useCallback(
    (newsId: string) =>
      displayFavorites.some((favorite) => favorite.newsId === newsId),
    [displayFavorites],
  );

  return {
    favorites: displayFavorites,
    isLoading,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}
