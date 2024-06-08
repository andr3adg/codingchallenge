import {Reducer, combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import postsListSlice from './postsListSlice';
import flagsListSlice from './flagsListSlice';
import networkSlice, {NetworkState} from './networkSlice';
import networkMiddleware from '../network/networkMiddleware';
import myCustomApiService from '../../network/network';
import {StoredListDataState} from '../post/types';
import {FlagsState} from '../flags/types';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['network'], // Exclude 'network' reducer from being persisted
};

const rootReducer: Reducer<{
  posts: StoredListDataState;
  flags: FlagsState;
  network: NetworkState;
}> = combineReducers({
  posts: postsListSlice.reducer,
  flags: flagsListSlice.reducer,
  network: networkSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: myCustomApiService,
      },
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(networkMiddleware),
});

store.subscribe(() => console.log('Some dispatch action was called!'));

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const {storeList, addMoreList, cleanList} = postsListSlice.actions;
export const {updateFlag} = flagsListSlice.actions;
export const {setNetworkStatus} = networkSlice.actions;
