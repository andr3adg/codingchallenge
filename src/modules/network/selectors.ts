import {RootState} from '../store/store';

export const selectIsOnline = (state: RootState) => state.network.isConnected;
