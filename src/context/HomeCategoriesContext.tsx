import React, {createContext, ReactNode, useContext, useMemo} from 'react';
import {RedditCategories} from '../utils/redditAPITypes';
import {useDispatch, useSelector} from 'react-redux';
import {selectSelectedCategory} from '../modules/post/selectors';
import {setSelectedCategory} from '../modules/store/store';
import {DEFAULT_SELECTED_CATEGORY} from '../modules/store/postsListSlice';

const categories = Object.values(RedditCategories);

type HomeCategoriesContextType = {
  selectedCategory: RedditCategories;
  categories: RedditCategories[];
  onPressCategory: (category: RedditCategories) => void;
};

const HomeCategoriesContext = createContext<HomeCategoriesContextType>({
  selectedCategory: DEFAULT_SELECTED_CATEGORY,
  categories,
  onPressCategory: () => {},
});

export const HomeCategoriesProvider = ({children}: {children: ReactNode}) => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(selectSelectedCategory);

  const value = useMemo(() => {
    const onPressCategory = (category: RedditCategories) => {
      if (category !== selectedCategory) {
        dispatch(setSelectedCategory(category));
      }
    };
    return {
      selectedCategory,
      categories,
      onPressCategory,
    };
  }, [dispatch, selectedCategory]);

  return (
    <HomeCategoriesContext.Provider value={value}>
      {children}
    </HomeCategoriesContext.Provider>
  );
};

export const useHomeCategories = () => useContext(HomeCategoriesContext);
