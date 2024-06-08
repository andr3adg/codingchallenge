import React from 'react';
import {StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import Loader from '../../components/ui/Loader';
import {webViewContentProps} from './PostDetailContainer';
import EmptyListPlaceholder from '../../components/ui/EmptyListPlaceholder';

type PostDetailProps = {
  title: string;
  isOnline: boolean;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  webViewContent: webViewContentProps;
};

const PostDetail: React.FC<PostDetailProps> = ({
  title,
  isOnline,
  isLoading,
  setIsLoading,
  webViewContent,
}) => {
  if (!isLoading && !isOnline) {
    return <EmptyListPlaceholder hideButton />;
  }
  return (
    <View style={styles.container}>
      <WebView
        source={webViewContent}
        style={styles.mainContainer}
        startInLoadingState={true}
        renderLoading={() => <Loader />}
        onLoadEnd={() => setIsLoading(false)}
        cacheEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
});

export default PostDetail;
