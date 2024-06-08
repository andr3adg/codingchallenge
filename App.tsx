import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import RootNavigation from './src/utils/RootNavigation';
import {store, persistor} from './src/modules/store/store';
import {PersistGate} from 'redux-persist/integration/react';

import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';
import Loader from './src/components/ui/Loader';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Loader />}>
        <SafeAreaView style={styles.appMainContainer}>
          <RootNavigation />
          <Toast />
        </SafeAreaView>
      </PersistGate>
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
