import { NewsEntity } from '@/domain/models/news-models';

export interface NewsRepository {
  getNews(range: number, lastId?: string): Promise<NewsEntity[]>;
}
