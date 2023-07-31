import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {BottomTabParamList} from '../@types';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {CalenderView} from '../screens/CalenderView/CalenderView';
import {ListView} from '../screens/listView/listView';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const ROOT_ROUTES: string[] = ['ListView', 'CalenderView'];

const TabBarVisibilityOptions = ({route}): BottomTabNavigationOptions => {
  const isNestedRoute: boolean = route.state?.index > 0;
  const isRootRoute: boolean = ROOT_ROUTES.includes(route.name);
  return {
    tabBarVisible: isRootRoute && !isNestedRoute,
    headerShown: false,
    // !isNestedRoute
  };
};

export const AppNavigator = (): React.ReactElement => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={TabBarVisibilityOptions}
        initialRouteName={'ListView'}>
        <BottomTab.Screen name="ListView" component={ListView} />
        <BottomTab.Screen name="CalenderView" component={CalenderView} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};
