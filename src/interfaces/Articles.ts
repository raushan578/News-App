export interface Article {
  url: string;
  urlToImage?: string;
  title: string;
  description: string;
  publishedAt: string;
  author: string;
  source: {
    name: string;
  };
}
