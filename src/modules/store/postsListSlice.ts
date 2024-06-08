import {RedditCategories} from '../../utils/redditAPITypes';
import {StoredListDataState} from '../post/types';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const generateInitialState = (): Record<
  RedditCategories,
  StoredListDataState
> => {
  const initialState: Record<RedditCategories, StoredListDataState> =
    {} as Record<RedditCategories, StoredListDataState>;

  Object.values(RedditCategories).forEach(category => {
    initialState[category] = {
      metadata: {
        currentIndex: 0,
      },
      data: [],
    };
  });

  return initialState;
};

export const DEFAULT_SELECTED_CATEGORY: RedditCategories = RedditCategories.HOT;

const initialState: {
  selectedCategory: RedditCategories;
} & Record<RedditCategories, StoredListDataState> = {
  selectedCategory: DEFAULT_SELECTED_CATEGORY,
  ...generateInitialState(),
};
export default createSlice({
  name: 'storedListData',
  initialState,
  reducers: {
    storeList: (state, action: PayloadAction<StoredListDataState>) => {
      const {metadata, data} = action.payload;
      const {selectedCategory} = state;
      state[selectedCategory].metadata = {...metadata};
      state[selectedCategory].data = [...data];
    },
    addMoreList: (state, action: PayloadAction<StoredListDataState>) => {
      const {metadata, data} = action.payload;
      const {selectedCategory} = state;
      state[selectedCategory].metadata = {...metadata};
      state[selectedCategory].data = [...state[selectedCategory].data, ...data];
    },
    cleanList: state => {
      const selectedCategory = state.selectedCategory;
      state[selectedCategory].metadata = {currentIndex: 0};
      state[selectedCategory].data = [];
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});
