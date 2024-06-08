import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface NetworkState {
  isConnected: boolean;
}

const initialState: NetworkState = {
  isConnected: true, // assume online by default
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
