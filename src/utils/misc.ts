import AsyncStorage from '@react-native-async-storage/async-storage';
import {axiosRequest} from '../network/network';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {RedditCategories} from './redditAPITypes';
import config from '../config/config';

/**
 * Download a web page and store its content in AsyncStorage.
 * @param {string} link - The URL of the web page to download.
 * @returns {Promise<void>} - A Promise that resolves when the download is complete.
 */
export const downloadWebPage = async (link: string): Promise<void> => {
  try {
    const options: AxiosRequestConfig = {
      url: link,
      method: 'GET',
    };
    const responseHandler = async (response: AxiosResponse): Promise<void> => {
      await AsyncStorage.setItem(link, response?.data);
    };

    await axiosRequest(options, responseHandler);
  } catch (error) {
    console.error('Error downloading web page:', error);
  }
};

/**
 * Load a saved web page content from AsyncStorage.
 * @param {string} link - The URL of the web page to load.
 * @returns {Promise<string | null>} - A Promise that resolves with the saved content, or null if not found.
 */
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

/**
 * Get the URL for a specific Reddit category.
 * @param {RedditCategories} category - The Reddit category.
 * @returns {string} - The generated category URL.
 */
export const getCategoryUrl = (category: RedditCategories): string => {
  return config.BASE_URL.replace('{selectedCategory}', category);
};

/**
 * Check if the time difference between two timestamps is greater than a specified interval.
 * @param {number} timestamp1 - The first timestamp.
 * @param {number} timestamp2 - The second timestamp.
 * @param {number} interval - The interval to compare against (in milliseconds).
 * @returns {boolean} - True if the time difference is greater than the interval, false otherwise.
 */
export const isTimeDifferenceGreaterThanInterval = (
  oldDate: number,
  newDate: number,
  interval: number,
): boolean => {
  const timeDifference = Math.abs(newDate - oldDate);
  return timeDifference > interval;
};


