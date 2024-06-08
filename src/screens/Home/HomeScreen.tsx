import React from 'react';
import {FlatList, View} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import PostCard from '../../components/ui/PostCard';
import {PostCardProps} from '../../modules/post/types';
import {RootStackParamList} from '../../utils/RootNavigation';
import styles from './HomeScreen.styles';
import Loader from '../../components/ui/Loader';
import {POST_ITEMS_PER_PAGE} from '../../modules/post/actions';
import EmptyListPlaceholder from '../../components/ui/EmptyListPlaceholder';
import {useHomeCategories} from '../../context/HomeCategoriesContext';
import HomeHeader from './components/HomeHeader/HomeHeader';

type HomeScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'Home'>;
  posts: PostCardProps[];
  fetchPosts: () => void;
  isLoading: boolean;
  onRefresh: () => void;
  isRefreshing: boolean;
  onLoadMore: () => void;
  isLoadingMore: boolean;
  hasTriedFirstLoad: boolean;
};

const itemSeparator = () => <View style={styles.itemSeparator} />;

const renderItem = (
  navigation: NavigationProp<RootStackParamList, 'Home'>,
  item: PostCardProps,
) => {
  const navigateToPostDetail = (postData: {
    permalink: string;
    title: string;
  }) => {
    navigation.navigate('PostDetail', postData);
  };

  return (
    <PostCard
      post={item}
      onPress={() =>
        navigateToPostDetail({permalink: item.permalink, title: item.title})
      }
    />
  );
};

const HomeScreen: React.FC<HomeScreenProps> = ({
  navigation,
  posts,
  fetchPosts,
  isLoading,
  onRefresh,
  isRefreshing,
  onLoadMore,
  isLoadingMore,
  hasTriedFirstLoad,
}) => {
  const {selectedCategory, categories, onPressCategory} = useHomeCategories();

  if (isLoading) {
    return <Loader />;
  }

  if (hasTriedFirstLoad && !posts?.length && !isLoading) {
    return <EmptyListPlaceholder onRetry={fetchPosts} />;
  }

  return (
    <>
      <HomeHeader
        categories={categories}
        selectedCategory={selectedCategory}
        onPress={onPressCategory}
      />
      <FlatList
        keyExtractor={item => item.id}
        data={posts}
        renderItem={({item}) => renderItem(navigation, item)}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={itemSeparator}
        ListFooterComponent={isLoadingMore ? <Loader /> : undefined}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        initialNumToRender={POST_ITEMS_PER_PAGE}

        /*onEndReachedThreshold={0.3}
        onEndReached={
          posts.length >= POST_ITEMS_PER_PAGE && !isLoadingMore
            ? onLoadMore
            : undefined
        }*/
      />
    </>
  );
};

export default HomeScreen;
