import React, {useCallback} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {getFormattedTime} from '../../../utils/timeHelper';
import {PostCardProps} from '../../../modules/post/types';
import CachedImage from '../CachedImage/CachedImage';
import styles from './PostCard.styles';

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

  const informationArea = useCallback(() => {
    const renderTimeInfo = () => (
      <Text style={[styles.createdText, styles.smallMarginBottom]}>
        {`${getFormattedTime(created_utc)} ago`}
      </Text>
    );

    const renderTitle = () => (
      <Text
        style={[styles.titleText, styles.smallMarginBottom]}
        numberOfLines={4}
        ellipsizeMode="tail">
        {title}
      </Text>
    );

    const renderPostInfo = () => (
      <View style={styles.infoContainer}>
        <Text style={styles.smallText}>{author}</Text>
        <Text style={styles.smallText}>Score: {score}</Text>
        <Text style={styles.smallText}>{num_comments} Comments</Text>
      </View>
    );

    return (
      <View style={styles.textContainer}>
        {renderTimeInfo()}
        {renderTitle()}
        {renderPostInfo()}
      </View>
    );
  }, [created_utc, title, author, score, num_comments]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        {postCardImage()}
        {informationArea()}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PostCard;
