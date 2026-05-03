'use client';

import { NewsEntity } from '@/domain/models/news-models';
import { Heart } from 'lucide-react';

interface NewsFavoriteListProps {
  items: NewsEntity[];
  onToggleFavorite: (newsId: string) => void;
  isFavorite: (newsId: string) => boolean;
}

export default function NewsList({
  items,
  onToggleFavorite,
  isFavorite,
}: NewsFavoriteListProps) {
  return (
    <section className="bg-transparent p-4 md:p-8">
      <div className="max-w-4xl mx-auto grid gap-8">
        {items.map((news) => {
          const favorited = isFavorite(news.id);

          return (
            <article
              key={news.id}
              className="group relative flex flex-col md:flex-row gap-6 p-5 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl hover:bg-zinc-900/80 hover:border-zinc-700 transition-all duration-300"
            >
              <div className="flex-1 flex flex-col min-w-0">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h2 className="text-xl font-bold text-zinc-100 leading-tight group-hover:text-white transition-colors line-clamp-2">
                    {news.title}
                  </h2>

                  <button
                    onClick={() => onToggleFavorite(news.id)}
                    className="p-2 -mt-1 -mr-1 rounded-full hover:bg-zinc-800 transition-colors shrink-0 z-10"
                    aria-label="お気に入り登録"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all duration-200 ${
                        favorited
                          ? 'fill-red-500 text-red-500'
                          : 'text-zinc-500 group-hover:text-zinc-400'
                      }`}
                    />
                  </button>
                </div>

                <p className="text-zinc-400 text-sm line-clamp-2 md:line-clamp-3 leading-relaxed mb-1">
                  {news.content}
                </p>
              </div>

              <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none" />
            </article>
          );
        })}
      </div>
    </section>
  );
}
