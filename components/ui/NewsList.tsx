'use client';

import { NewsEntity } from '@/domain/models/news-models';
import { Heart } from 'lucide-react';
import Image from 'next/image';

interface NewsListProps {
  items: NewsEntity[];
  loading: boolean;
  hasMore: boolean;
  observerRef: (node?: Element | null) => void;
  onToggleFavorite: (newsId: string) => void;
  isFavorite: (newsId: string) => boolean;
}

export default function NewsList({
  items,
  loading,
  hasMore,
  observerRef,
  onToggleFavorite,
  isFavorite,
}: NewsListProps) {
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
              {news.imageUrl && (
                <div className="relative w-full md:w-48 h-48 md:h-32 shrink-0 overflow-hidden rounded-xl bg-zinc-800">
                  <Image
                    src={news.imageUrl}
                    alt={news.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 192px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              )}

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

      <div ref={observerRef} className="py-16 text-center">
        {loading && (
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-zinc-900 rounded-full border border-zinc-800 shadow-xl">
            <div className="w-4 h-4 border-2 border-zinc-600 border-t-zinc-200 rounded-full animate-spin" />
            <span className="text-xs font-medium text-zinc-400 tracking-widest uppercase">
              Loading
            </span>
          </div>
        )}

        {!hasMore && items.length > 0 && (
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-[1px] bg-zinc-800" />
            <p className="text-sm text-zinc-600 font-medium">
              全てのニュースを読み込みました
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
