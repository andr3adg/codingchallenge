import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import RootNavigation from './src/utils/RootNavigation';
import {store} from './src/modules/store/store';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.appMainContainer}>
        <RootNavigation />
        <Toast />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  appMainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
