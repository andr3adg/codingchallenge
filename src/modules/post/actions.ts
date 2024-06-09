import {AxiosRequestConfig, AxiosResponse} from 'axios';

import {formatPostsFromRequestToList} from './formatters';
import {RootState, addMoreList, storeList, updateFlag} from '../store/store';
import {FlagTypes} from '../flags/types';
import Toast from 'react-native-toast-message';
import {getCategoryUrl} from '../../utils/misc';
import {PostCardProps} from './types';

export const POST_ITEMS_PER_PAGE = 15;

const getResponseFormattedList = (response: AxiosResponse): PostCardProps[] => {
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
      const {network, posts} = getState();
      const isConnected = network.isConnected;
      if (!isConnected) {
        throw new Error('No internet connection');
      }
      dispatch(updateFlag({flag, value: true}));
      const options: AxiosRequestConfig = {
        url: `${getCategoryUrl(posts.selectedCategory)}`,
        method: 'GET',
        params: {limit: POST_ITEMS_PER_PAGE},
      };

      const getPostsDataHandler = (response: AxiosResponse) => {
        const formattedList = getResponseFormattedList(response);
        dispatch(
          storeList({
            currentIndex: formattedList.length,
            data: formattedList,
            lastFetchTime: Date.now(),
          }),
        );
      };

      await axiosRequest(options, getPostsDataHandler);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Fetching posts',
        text2: error?.message ?? undefined,
      });
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
        throw new Error('No internet connection');
      }
      dispatch(updateFlag({flag: FlagTypes.POSTS_LOADING_MORE, value: true}));
      const currentCount = posts[posts?.selectedCategory]?.currentIndex ?? 0;

      const options: AxiosRequestConfig = {
        url: `${getCategoryUrl(posts.selectedCategory)}`,
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
            currentIndex: currentCount + formattedList.length,
            data: formattedList,
            lastFetchTime: Date.now(),
          }),
        );
      };

      await axiosRequest(options, getMorePostsDataHandler);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Fetching posts',
        text2: error?.message ?? undefined,
      });
    } finally {
      dispatch(updateFlag({flag: FlagTypes.POSTS_LOADING_MORE, value: false}));
    }
  };
};
