import {RedditCategories} from '../../utils/redditAPITypes';
import {PostsDataStoreType, StoredListDataStateType} from '../post/types';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const generateInitialState = (): Record<
  RedditCategories,
  StoredListDataStateType
> => {
  const initialState: Record<RedditCategories, StoredListDataStateType> =
    {} as Record<RedditCategories, StoredListDataStateType>;

  Object.values(RedditCategories).forEach(category => {
    initialState[category] = {
      currentIndex: 0,
      data: [],
      lastFetchTime: null,
    };
  });

  return initialState;
};

export const DEFAULT_SELECTED_CATEGORY: RedditCategories = RedditCategories.HOT;

const initialState: PostsDataStoreType = {
  selectedCategory: DEFAULT_SELECTED_CATEGORY,
  ...generateInitialState(),
};
export default createSlice({
  name: 'storedListData',
  initialState,
  reducers: {
    storeList: (state, action: PayloadAction<StoredListDataStateType>) => {
      const {currentIndex, data, lastFetchTime} = action.payload;
      const {selectedCategory} = state;
      state[selectedCategory] = {currentIndex, data, lastFetchTime};
    },
    addMoreList: (state, action: PayloadAction<StoredListDataStateType>) => {
      const {currentIndex, data, lastFetchTime} = action.payload;
      const {selectedCategory} = state;
      state[selectedCategory] = {
        currentIndex,
        data: [...state[selectedCategory].data, ...data],
        lastFetchTime,
      };
    },
    cleanList: state => {
      const selectedCategory = state.selectedCategory;
      state[selectedCategory] = {
        currentIndex: 0,
        data: [],
        lastFetchTime: null,
      };
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});
