import {AxiosRequestConfig, AxiosResponse} from 'axios';

import {formatPostsFromRequestToList} from './formatters';
import {BASE_URL} from '../../network/network';
import {RootState, addMoreList, storeList, updateFlag} from '../store/store';
import {FlagTypes} from '../flags/types';
import Toast from 'react-native-toast-message';

export const POST_ITEMS_PER_PAGE = 15;

const fireNoConnectionInfo = () => {
  Toast.show({
    type: 'error',
    text1: 'Connection Error',
    text2: 'Device is Offline',
  });
};

const getResponseFormattedList = (response: AxiosResponse) => {
  const {children: rawList = []} = response?.data?.data;

  if (!rawList.length) {
    return [];
  }
  return formatPostsFromRequestToList(rawList);
};

//todo type dispatch
export const getPosts = (isRefresh: boolean = false): any => {
  return async (
    dispatch: any,
    getState: () => RootState,
    {axiosRequest}: any,
  ) => {
    const flag = isRefresh
      ? FlagTypes.POSTS_REFRESHING
      : FlagTypes.POSTS_LOADING;
    try {
      const isConnected = getState().network.isConnected;
      if (!isConnected) {
        fireNoConnectionInfo();
        return;
      }
      dispatch(updateFlag({flag, value: true}));
      const options: AxiosRequestConfig = {
        url: `${BASE_URL}`,
        method: 'GET',
        params: {limit: POST_ITEMS_PER_PAGE},
      };

      const getPostsDataHandler = (response: AxiosResponse) => {
        const formattedList = getResponseFormattedList(response);
        dispatch(
          storeList({
            metadata: {currentIndex: formattedList.length},
            data: formattedList,
          }),
        );
      };

      await axiosRequest(options, getPostsDataHandler);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      dispatch(updateFlag({flag, value: false}));
    }
  };
};

//todo type dispatch
export const getMorePosts = (): any => {
  return async (
    dispatch: any,
    getState: () => RootState,
    {axiosRequest}: any,
  ) => {
    try {
      const {posts, network} = getState();
      if (!network?.isConnected) {
        fireNoConnectionInfo();
        return;
      }
      dispatch(updateFlag({flag: FlagTypes.POSTS_LOADING_MORE, value: true}));
      const currentCount = posts?.metadata?.currentIndex ?? 0;

      const options: AxiosRequestConfig = {
        url: `${BASE_URL}`,
        method: 'GET',
        params: {
          limit: POST_ITEMS_PER_PAGE,
          count: currentCount,
        },
      };

      const getMorePostsDataHandler = (response: AxiosResponse) => {
        const formattedList = getResponseFormattedList(response);

        dispatch(
          addMoreList({
            metadata: {currentIndex: currentCount + formattedList.length},
            data: formattedList,
          }),
        );
      };

      await axiosRequest(options, getMorePostsDataHandler);
    } catch (error) {
      console.error('Error fetching more posts:', error);
    } finally {
      dispatch(updateFlag({flag: FlagTypes.POSTS_LOADING_MORE, value: false}));
    }
  };
};
