export type PostCardProps = {
  id: string;
  title: string;
  author: string;
  score: number;
  num_comments: number;
  created_utc: number;
  url: string | undefined;
  permalink: string;
};

export type PostCardNavigationParams = {
  permalink: string;
  title: string;
};

export interface StoredListDataState {
  metadata: {
    currentIndex: number;
  };
  data: PostCardProps[];
}
