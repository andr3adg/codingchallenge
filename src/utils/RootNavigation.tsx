import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreenContainer from '../screens/Home/HomeScreenContainer';
import PostDetailContainer from '../screens/PostDetail/PostDetailContainer';
import {NavigationContainer} from '@react-navigation/native';
import {PostCardNavigationParams} from '../modules/post/types';
export type RootStackParamList = {
  Home: undefined;
  PostDetail: PostCardNavigationParams;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreenContainer}
          options={{title: 'R/Pics'}}
        />
        <Stack.Screen name="PostDetail" component={PostDetailContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
