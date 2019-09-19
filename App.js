import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import IndexScreen from './src/screens/IndexScreen';
import HomeScreen from './src/screens/HomeScreen';

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Index: IndexScreen,
});

const App = createAppContainer(TabNavigator);

export default () => {
  return (
    <App />
  );
}
