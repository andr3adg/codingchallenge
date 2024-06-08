import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {FlagTypes, FlagsState} from '../flags/types';

export const initialState: FlagsState = {
  flags: {
    [FlagTypes.POSTS_LOADING]: false,
    [FlagTypes.POSTS_REFRESHING]: false,
    [FlagTypes.POSTS_LOADING_MORE]: false,
  },
};

export default createSlice({
  name: 'flags',
  initialState,
  reducers: {
    updateFlag(state, action: PayloadAction<{flag: string; value: boolean}>) {
      const {flag, value} = action.payload;
      state.flags[flag] = value;
    },
  },
});
