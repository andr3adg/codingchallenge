import {RedditCategories} from '../../utils/redditAPITypes';

export interface PostCardProps {
  id: string;
  title: string;
  author: string;
  score: number;
  num_comments: number;
  created_utc: number;
  url: string | undefined;
  permalink: string;
}

export interface PostCardNavigationParams {
  permalink: string;
  title: string;
}

export interface StoredListDataStateType {
  currentIndex: number;
  data: PostCardProps[];
  lastFetchTime: number | null;
}

interface PostsDataStoreBase {
  selectedCategory: RedditCategories;
}

type PostsDataStoreDynamic = {
  [category in RedditCategories]: StoredListDataStateType;
};

export interface PostsDataStoreType
  extends PostsDataStoreBase,
    PostsDataStoreDynamic {}
