import {ActivityIndicator, View} from 'react-native';
import React from 'react';
import styles from './Loader.styles';

const Loader = () => (
  <View style={styles.loaderContainer}>
    <ActivityIndicator size="large" />
  </View>
);

export default Loader;
