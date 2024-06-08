import React, {useCallback} from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {RedditCategories} from '../../../../utils/redditAPITypes';
import styles from './HomeHeader.styles';

type HomeHeaderProps = {
  categories: RedditCategories[];
  selectedCategory: RedditCategories;
  onPress: (category: RedditCategories) => void;
};

const HomeHeader: React.FC<HomeHeaderProps> = ({
  categories,
  selectedCategory,
  onPress,
}) => {
  const getHeaderItems = useCallback(() => {
    return categories?.map(category => {
      const categoryStyle: StyleProp<ViewStyle> = [styles.categoryContainer];
      const textStyle: StyleProp<TextStyle> = [styles.categoryText];

      if (selectedCategory === category) {
        categoryStyle.push(styles.selectedCategoryContainer);
        textStyle.push(styles.selectedCategoryText);
      }
      return (
        <TouchableWithoutFeedback
          key={category}
          onPress={() => onPress(category)}>
          <View
            style={[
              ...categoryStyle,
              {width: `${100 / (categories?.length ?? 1)}%`},
            ]}>
            <Text style={[...textStyle]}>{category}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    });
  }, [categories, onPress, selectedCategory]);

  return <View style={styles.container}>{getHeaderItems()}</View>;
};

export default HomeHeader;
