import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NetworkState} from '../network/types';

const initialState: NetworkState = {
  isConnected: true,
};

export default createSlice({
  name: 'network',
  initialState,
  reducers: {
    setNetworkStatus(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload;
    },
  },
});
