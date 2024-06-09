import React from 'react';
import {StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import {webViewContentProps} from './PostDetailContainer';
import EmptyListPlaceholder from '../../components/ui/EmptyListPlaceholder/EmptyListPlaceholder';

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
  if (!isOnline && isLoading) {
    // If offline and still loading, lets wait
    return;
  }

  if (!isOnline && !isLoading && !webViewContent?.html) {
    // If offline, not loading, and no HTML content, return EmptyListPlaceholder
    return (
      <EmptyListPlaceholder
        hideButton
        customMessage="You are offline and never opened this page before. When you do, online, it will be downloaded and available after, even offline"
      />
    );
  }

  return (
    <WebView
      source={webViewContent}
      style={styles.container}
      onLoadEnd={() => setIsLoading(false)}
      cacheEnabled={true}
      containerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PostDetail;
