import React from 'react';
import firebase from 'firebase';
import { StyleSheet } from 'react-native';
import { useScreens } from 'react-native-screens';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
/* our imports */
import HomeScreen from './src/screens/HomeScreen';
import TasksScreen from './src/screens/TasksScreen';
import AuthScreen from './src/screens/AuthScreen';
import CreateTaskScreen from './src/screens/CreateTaskScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import BillsScreen from './src/screens/BillsScreen';
import CreateBillScreen from './src/screens/CreateBillScreen';

useScreens();
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

const tabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  Tasks: {
    screen: TasksScreen,
    navigationOptions: {
      header: null
    }
  },
  Bills: {
    screen: BillsScreen,
  },
},
{
  initialRouteName: 'Home',
});

const taskNavigator = createStackNavigator({
  CreateTask: CreateTaskScreen,
});

const appStackNavigator = createStackNavigator({
  Home: tabNavigator,
  Tasks: taskNavigator,
  CreateBill: CreateBillScreen,
  TaskCalendar: CalendarScreen,
},{
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    header: null
  }
});

const authStack = createStackNavigator({
  Login: AuthScreen,
});

const switchNav = createSwitchNavigator({
  App: appStackNavigator,
  Auth: authStack,
}, {
  initialRouteName: 'Auth',
  defaultNavigationOptions: {
    header: null
  }
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
