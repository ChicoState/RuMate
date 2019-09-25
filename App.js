import React from 'react';
import { useScreens } from 'react-native-screens';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './src/screens/HomeScreen';
import TasksScreen from './src/screens/TasksScreen';
import LoginScreen from './src/screens/LoginScreen';
import CreateTaskScreen from './src/screens/CreateTaskScreen';
useScreens();

// Add extra tabs here
const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    defaultNavigationOptions: {
      showIcon: true,
      tabBarIcon: ({ tintColor }) => {
        <Icon name="home" size={20} />
      }
    }
  },
  Tasks: {
    screen: TasksScreen,
    defaultNavigationOptions: {
      tabBarLabel: "Tasks"
    }
  },
  // next screen here
},{
  initialRouteName: 'Home',
  defaultNavigationOptions: {

  }
});

// Add extra stack screens here
const StackNavigator = createStackNavigator({
  Login: LoginScreen,
  Main: TabNavigator,
  CreateTask: CreateTaskScreen,
},{
  initialRouteName: 'Login',
  defaultNavigationOptions:  { 
    title: 'RuMate',
    headerLeft: null,
    gesturesEnabled: false
  }
});

const App = createAppContainer(StackNavigator);

export default () => {
  return (
    <App />
  );
}
