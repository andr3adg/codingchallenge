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

// Define the properties of the interface excluding the mapped type
interface PostsDataStoreBase {
  selectedCategory: RedditCategories;
}

// Define the mapped type for dynamic category properties
type PostsDataStoreDynamic = {
  [category in RedditCategories]: StoredListDataStateType;
};

// Combine the base properties with the dynamic properties
export interface PostsDataStoreType
  extends PostsDataStoreBase,
    PostsDataStoreDynamic {}
