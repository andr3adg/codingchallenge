import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreenContainer, {
  HomeScreenContainerProps,
} from '../screens/Home/HomeScreenContainer';
import PostDetailContainer from '../screens/PostDetail/PostDetailContainer';
import {NavigationContainer} from '@react-navigation/native';
import {PostCardNavigationParams} from '../modules/post/types';
import {HomeCategoriesProvider} from '../context/HomeCategoriesContext';
export type RootStackParamList = {
  Home: undefined;
  PostDetail: PostCardNavigationParams;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeScreen = ({navigation}: HomeScreenContainerProps) => (
  <HomeCategoriesProvider>
    <HomeScreenContainer navigation={navigation} />
  </HomeCategoriesProvider>
);

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'R/Pics'}}
        />
        <Stack.Screen name="PostDetail" component={PostDetailContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
