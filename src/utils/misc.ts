import AsyncStorage from '@react-native-async-storage/async-storage';
import {axiosRequest} from '../network/network';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {RedditCategories} from './redditAPITypes';
import config from '../config/config';

//todo type
export const paramsToQueryString = params => {
  return Object.keys(params)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    .join('&');
};

export const downloadWebPage = async (link: string): Promise<void> => {
  try {
    const options: AxiosRequestConfig = {
      url: link,
      method: 'GET',
    };
    const responseHandler = async (response: AxiosResponse) => {
      await AsyncStorage.setItem(link, response?.data);
    };

    await axiosRequest(options, responseHandler);
  } catch (error) {
    console.error('Error downloading web page:', error);
  }
};

export const loadSavedWebPage = async (
  link: string,
): Promise<string | null> => {
  try {
    const savedContent = await AsyncStorage.getItem(link);
    return savedContent || null;
  } catch (error) {
    console.error('Error loading saved web page:', error);
    return null;
  }
};

export const getCategoryUrl = (category: RedditCategories) => {
  return config.BASE_URL.replace('{selectedCategory}', category);
};
