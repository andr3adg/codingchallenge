import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import overallConfig from '../config/config';
import Toast from 'react-native-toast-message';
import FakeSentryService from '../services/FakeSentryService';
import FakeAmplitudeService from '../services/FakeAmplitudeService';

//interceptor for overall request config, just demo
const requestInterceptors = (
  config: AxiosRequestConfig,
): AxiosRequestConfig => {
  config.timeout = overallConfig.TIMEOUT_DURATION;
  return config;
};
//interceptor for overall request config, just demo
const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

axios.interceptors.request.use(requestInterceptors);
axios.interceptors.response.use(responseInterceptor);

export const axiosRequest = async (
  options: AxiosRequestConfig,
  dataHandler: (response: AxiosResponse) => void,
) => {
  try {
    FakeAmplitudeService.logEvent('Axios Call');

    const response = await axios(options);
    dataHandler(response);
  } catch (error: any) {
    //Fake Sentry exception capture
    FakeSentryService.captureException(error);
    Toast.show({
      type: 'error',
      text1: 'Api Request Error',
      text2: error?.message ?? undefined,
    });
    throw new Error(`Error in axios request: ${error}`);
  }
};

const myCustomApiService = {
  axiosRequest,
};

export default myCustomApiService;
