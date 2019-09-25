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

const TaskStackNavigator = createStackNavigator({
  Task: TasksScreen,
  CreateTask: CreateTaskScreen,
},{
    initialRouteName: 'Task',
    defaultNavigationOptions: {

    }
});

const TabNavigator = createBottomTabNavigator({
<<<<<<< HEAD
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
=======
  Home: HomeScreen,
  //Tasks: TasksScreen,
  Tasks: TaskStackNavigator,
},{
  initialRouteName: 'Home',
  defaultNavigationOptions: {

  }
>>>>>>> 6e3ae4c1332fdd971c317b03dd7c6c3b4e59d053
});

const StackNavigator = createStackNavigator({
  Login: LoginScreen,
  Main: TabNavigator
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
