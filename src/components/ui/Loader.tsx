import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
const Loader = () => (
  <View style={styles.loaderContainer}>
    <ActivityIndicator size="large" />
  </View>
);

const styles = StyleSheet.create({
  loaderContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default Loader;
