import * as z from 'zod';

export const NewsEntitySchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  imageUrl: z.string().nullish(),
});

export type NewsEntity = z.infer<typeof NewsEntitySchema>;

export const NewsFavoriteSchema = z.object({
  id: z.string(),
  uid: z.string(),
  newsId: z.string(),
  title: z.string(),
  content: z.string(),
  imageUrl: z.string().nullish(),
});

export type NewsFavorite = z.infer<typeof NewsFavoriteSchema>;
