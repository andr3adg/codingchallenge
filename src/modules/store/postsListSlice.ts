import {StoredListDataState} from '../post/types';
import {createSlice} from '@reduxjs/toolkit';

export const initialState: StoredListDataState = {
  metadata: {
    currentIndex: 0,
  },
  data: [],
};

export default createSlice({
  name: 'storedListData',
  initialState,
  reducers: {
    storeList: (state, action) => {
      state.metadata = action.payload.metadata;
      state.data = action.payload.data;
    },
    addMoreList: (state, action) => {
      const {metadata, data} = action.payload;
      state.metadata = {...metadata};
      state.data = [...state.data, ...data];
    },
    cleanList: state => {
      state.metadata = {
        currentIndex: 0,
      };
      state.data = [];
    },
  },
});
