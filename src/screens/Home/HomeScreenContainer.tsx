import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../utils/RootNavigation';
import {getMorePosts, getPosts} from '../../modules/post/actions';
import HomeScreen from './HomeScreen';
import {selectPostsData} from '../../modules/post/selectors';
import {selectFlagValue} from '../../modules/flags/selectors';
import {FlagTypes} from '../../modules/flags/types';
import {useHomeCategories} from '../../context/HomeCategoriesContext';

export type HomeScreenContainerProps = {
  navigation: NavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreenContainer: React.FC<HomeScreenContainerProps> = ({
  navigation,
}) => {
  const dispatch = useDispatch();
  const [hasTriedFirstLoad, setHasTriedFirstLoad] = useState(false);
  const posts = useSelector(selectPostsData);
  const isLoading = useSelector(selectFlagValue(FlagTypes.POSTS_LOADING));
  const isRefreshing = useSelector(selectFlagValue(FlagTypes.POSTS_REFRESHING));
  const isLoadingMore = useSelector(
    selectFlagValue(FlagTypes.POSTS_LOADING_MORE),
  );
  const {selectedCategory} = useHomeCategories();

  useEffect(() => {
    dispatch(getPosts());
    setHasTriedFirstLoad(true);
  }, [dispatch, selectedCategory]);

  const fetchPosts = (isRefresh: boolean) => {
    dispatch(getPosts(isRefresh));
  };

  const fetchMorePosts = () => {
    dispatch(getMorePosts());
  };

  return (
    <HomeScreen
      navigation={navigation}
      posts={posts}
      fetchPosts={() => fetchPosts(false)}
      isLoading={isLoading}
      onRefresh={() => fetchPosts(true)}
      isRefreshing={isRefreshing}
      onLoadMore={fetchMorePosts}
      isLoadingMore={isLoadingMore}
      hasTriedFirstLoad={hasTriedFirstLoad}
    />
  );
};

export default HomeScreenContainer;
