import React from 'react';

import {useNetInfo} from '@react-native-community/netinfo';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectIsOnline} from '../modules/network/selectors';
import {setNetworkStatus} from '../modules/store/store';
import {StyleSheet, Text, View} from 'react-native';
const NetworkService = () => {
  const netInfo = useNetInfo();
  const dispatch = useDispatch();
  const isOnline = useSelector(selectIsOnline);

  useEffect(() => {
    if (netInfo !== null && isOnline !== netInfo.isConnected) {
      dispatch(setNetworkStatus(!!netInfo.isConnected));
    }
  }, [dispatch, isOnline, netInfo]);

  if (isOnline) {
    return null;
  }
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.textStyle}>{'No connection'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: 'red',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default NetworkService;
