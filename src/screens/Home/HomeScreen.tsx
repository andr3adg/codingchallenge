import React, {useCallback} from 'react';
import {FlatList, View} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import PostCard from '../../components/ui/PostCard/PostCard';
import {PostCardProps} from '../../modules/post/types';
import {RootStackParamList} from '../../utils/RootNavigation';
import styles from './HomeScreen.styles';
import Loader from '../../components/ui/Loader/Loader';
import {POST_ITEMS_PER_PAGE} from '../../modules/post/actions';
import EmptyListPlaceholder from '../../components/ui/EmptyListPlaceholder/EmptyListPlaceholder';
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

  const renderItem = useCallback(
    ({item}: {item: PostCardProps}) => {
      const navigateToPostDetail = () => {
        const {permalink, title} = item;
        navigation.navigate('PostDetail', {
          permalink,
          title,
        });
      };

      return <PostCard post={item} onPress={navigateToPostDetail} />;
    },
    [navigation],
  );

  const renderMainContent = useCallback(() => {
    if (hasTriedFirstLoad && !posts?.length && !isLoading) {
      return <EmptyListPlaceholder onRetry={fetchPosts} />;
    }

    const itemSeparator = () => <View style={styles.itemSeparator} />;

    return (
      <FlatList
        keyExtractor={item => item.id}
        data={posts}
        renderItem={renderItem}
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
    );
  }, [
    fetchPosts,
    hasTriedFirstLoad,
    isLoading,
    isLoadingMore,
    isRefreshing,
    onRefresh,
    posts,
    renderItem,
  ]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <HomeHeader
        categories={categories}
        selectedCategory={selectedCategory}
        onPress={onPressCategory}
      />
      {renderMainContent()}
    </>
  );
};

export default HomeScreen;
