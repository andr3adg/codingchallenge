// selectors.ts
import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store/store';
import {PostCardProps} from '../post/types';

// Input selector to get the raw posts data from the state
const selectRawPostsData = (state: RootState) => state.posts.data;

// Selector to transform the raw posts data if needed
export const selectPostsData = createSelector(
  [selectRawPostsData],
  (data: PostCardProps[]) => {
    return [...data];
  },
);
