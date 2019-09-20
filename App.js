import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from './src/screens/HomeScreen';
import TasksScreen from './src/screens/TasksScreen';

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Tasks: TasksScreen,
});

const App = createAppContainer(TabNavigator);

export default () => {
  return (
    <App />
  );
}
