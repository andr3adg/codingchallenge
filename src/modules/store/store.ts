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
import networkSlice from './networkSlice';
import myCustomApiService from '../../network/network';
import {PostsDataStoreType} from '../post/types';
import {FlagsState} from '../flags/types';
import {NetworkState} from '../network/types';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['network'], // Exclude 'network' reducer from being persisted
};

const rootReducer: Reducer<{
  posts: PostsDataStoreType;
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
    }),
});

store.subscribe(() => {});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const {storeList, addMoreList, cleanList, setSelectedCategory} =
  postsListSlice.actions;
export const {updateFlag} = flagsListSlice.actions;
export const {setNetworkStatus} = networkSlice.actions;
