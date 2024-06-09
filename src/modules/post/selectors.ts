// selectors.ts
import {RootState} from '../store/store';
import {PostCardProps} from '../post/types';
import {RedditCategories} from '../../utils/redditAPITypes';

export const selectPostsData = (state: RootState): PostCardProps[] =>
  state?.posts[state?.posts?.selectedCategory]?.data || [];

export const selectSelectedCategory = (state: RootState): RedditCategories =>
  state?.posts?.selectedCategory;

export const selectLastFetchTime = (state: RootState): number | null =>
  state?.posts[state?.posts?.selectedCategory]?.lastFetchTime || null;
