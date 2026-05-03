// hooks/useNewsFeed.ts
'use client';

import { NewsEntity } from '@/domain/models/news-models';
import { getNewsAction } from '@/actions/news';
import { useState, useCallback } from 'react';

export function useNewsFeed(initialData: NewsEntity[]) {
  const [items, setItems] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialData.length >= 10);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    const lastItem = items[items.length - 1];
    const lastId = lastItem ? lastItem.id : null;

    const newData = await getNewsAction(10, lastId ?? undefined);

    if (!newData || newData.length === 0) {
      setHasMore(false);
    } else {
      setItems((prev) => [...prev, ...newData]);
      if (newData.length < 10) {
        setHasMore(false);
      }
    }

    setLoading(false);
  }, [items, loading, hasMore]);

  return { items, loadMore, hasMore, loading };
}
