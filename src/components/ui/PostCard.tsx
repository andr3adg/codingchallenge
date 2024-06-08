import React, {useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {getFormattedTime} from '../../utils/timeHelper';
import {PostCardProps} from '../../modules/post/types';
import CachedImage from './CachedImage';

const PostCard: React.FC<{post: PostCardProps; onPress: () => void}> = ({
  post,
  onPress,
}) => {
  const {url, created_utc, title, author, score, num_comments} = post;

  const postCardImage = useCallback(
    () => (
      <View style={styles.imageContainer}>
        <CachedImage uri={url ?? ''} style={styles.image} />
      </View>
    ),
    [url],
  );

  const informationArea = useCallback(
    () => (
      <View style={styles.textContainer}>
        <Text style={[styles.createdText, styles.smallMarginBottom]}>
          {`${getFormattedTime(created_utc)} ago`}
        </Text>

        <Text
          style={[styles.titleText, styles.smallMarginBottom]}
          numberOfLines={4}
          ellipsizeMode="tail">
          {title}
        </Text>

        <View style={styles.infoContainer}>
          <Text style={styles.smallText}>{author}</Text>
          <Text style={styles.smallText}>Score: {score}</Text>
          <Text style={styles.smallText}>{num_comments} Comments</Text>
        </View>
      </View>
    ),
    [created_utc, title, author, score, num_comments],
  );

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        {postCardImage()}
        {informationArea()}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '25%',
    marginRight: 10,
  },
  image: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  createdText: {
    textAlign: 'right',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallMarginBottom: {
    marginBottom: 5,
  },
});

export default PostCard;
