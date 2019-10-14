import React from 'react';
import { StyleSheet, Button } from 'react-native';
import { useScreens } from 'react-native-screens';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import TasksScreen from './src/screens/TasksScreen';
import LoginScreen from './src/screens/LoginScreen';
import CreateTaskScreen from './src/screens/CreateTaskScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import CalendarScreen from './src/screens/CalendarScreen';
useScreens();

//TODO: DL - this is very inefficient to include the entire firebase SDK
//we will need to update to only include specific SDK's once we have a better
//idea of which ones we need

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import BillsScreen from './src/screens/BillsScreen';

const firebaseConfig = {
  apiKey: "AIzaSyA_ZWMR-MFG_ZHNK4_WuEeHoLP9vzsY_Vk",
  authDomain: "rumate-faaeb.firebaseapp.com",
  databaseURL: "https://rumate-faaeb.firebaseio.com",
  projectId: "rumate-faaeb",
  storageBucket: "",
  messagingSenderId: "484837108351",
  appId: "1:484837108351:web:53a875e9546d00aa2dad4a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
  },
  Tasks: {
    screen: TasksScreen,
  },
  Bills: {
    screen: BillsScreen,
  },
},{
  initialRouteName: 'Home',
});

const taskNavigator = createStackNavigator({
  CreateTask: CreateTaskScreen,
  TaskCalendar: CalendarScreen,
}, {
  defaultNavigationOptions: {
    header: null
  }
});

const appStackNavigator = createStackNavigator({
  Register: RegisterScreen,
  Main: TabNavigator,
  Tasks: taskNavigator,
},{
  initialRouteName: 'Main',
});

const authStack = createStackNavigator({
  Login: LoginScreen
});

const switchNav = createSwitchNavigator({
  App: appStackNavigator,
  Auth: authStack,
}, {
  initialRouteName: 'Auth',
});

const App = createAppContainer(switchNav);

const styles = StyleSheet.create({
  headerLeft: {
    fontSize: 20
  }
});

export default () => {
  return (
    <App />
  );
}
