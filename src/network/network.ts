import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

export const BASE_URL = 'https://api.reddit.com/r/pics/hot.json';

export const axiosRequest = async (
  options: AxiosRequestConfig,
  dataHandler: (response: AxiosResponse) => void,
) => {
  try {
    const response = await axios(options);
    dataHandler(response);
  } catch (error: unknown) {
    console.error('Error in axios request:', error);
    throw new Error(`Error in axios request: ${error}`);
  }
};

const myCustomApiService = {
  axiosRequest,
};

export default myCustomApiService;
