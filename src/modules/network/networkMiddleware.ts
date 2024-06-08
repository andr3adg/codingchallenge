import {Middleware} from '@reduxjs/toolkit';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {setNetworkStatus} from '../store/store';

const networkMiddleware: Middleware = ({dispatch}) => {
  let subscribe: (() => void) | null = null;

  const handleNetworkStateChange = (state: NetInfoState) => {
    dispatch(setNetworkStatus(state.isConnected ?? false));
  };

  const initializeNetworkStatus = async () => {
    const initialNetworkState = await NetInfo.fetch();
    handleNetworkStateChange(initialNetworkState);

    // Subscribe to network status changes
    subscribe = NetInfo.addEventListener(handleNetworkStateChange);
  };

  // Initialize network status
  initializeNetworkStatus();

  return next => async action => {
    if (subscribe && action.type === 'NETWORK_SHUTDOWN') {
      // Clean up subscription on store shutdown
      subscribe();
      subscribe = null;
    }
    return next(action);
  };
};

export default networkMiddleware;
