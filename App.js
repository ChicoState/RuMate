import React from 'react';
import firebase from 'firebase';
import { StyleSheet } from 'react-native';
import { useScreens } from 'react-native-screens';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
/* our imports */
import HomeScreen from './src/screens/HomeScreen';
import TasksScreen from './src/screens/TasksScreen';
import AuthScreen from './src/screens/AuthScreen';
import CreateTaskScreen from './src/screens/CreateTaskScreen';
import AddRoommateScreen from './src/screens/AddRoomateScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import BillsScreen from './src/screens/BillsScreen';
import CreateBillScreen from './src/screens/CreateBillScreen';
import CreateRoommateGroupScreen from './src/screens/CreateRoommateGroupScreen';
import MessageScreen from './src/screens/MessagesScreen';
import CreateConversationScreen from './src/screens/CreateConversationScreen';
import ConversationScreen from './src/screens/ConversationScreen';
import InvitationsScreen from './src/screens/InvitationsScreen';
import AccountScreen from './src/screens/AccountScreen';
import PriorityScreen from './src/screens/PriorityScreen';
import ChangeDetailsScreen from './src/screens/ChangeDetailsScreen';

useScreens();
// ################################ //
// Remove to debug errors/warnings  //
   console.disableYellowBox = true; //
// ################################ //
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
      tabBarLabel: "Home",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" size={20} />
      )
    },
  },
  Tasks: {
    screen: TasksScreen,
    navigationOptions: {
      tabBarLabel: "Tasks",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="tasks" size={20} />
      )
    },
  },
  Bills: {
    screen: BillsScreen,
    navigationOptions: {
      tabBarLabel: "Bills",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="dollar" size={20} />
      )
    },
  },
  Messages: {
    screen: MessageScreen,
    navigationOptions: {
      tabBarLabel: "Messages",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="comments" size={20} />
      )
    },
  }
},
{
  initialRouteName: 'Home',
});

const taskNavigator = createStackNavigator({
  CreateTask: CreateTaskScreen,
}, {
  defaultNavigationOptions: {
    header: null
  }
});

const appStackNavigator = createStackNavigator({
  Priority: PriorityScreen,
  Invitations: InvitationsScreen,
  CreateRoommateGroup: CreateRoommateGroupScreen,
  AddRoommate: AddRoommateScreen,
  Home: tabNavigator,
  Tasks: taskNavigator,
  CreateBill: CreateBillScreen,
  TaskCalendar: CalendarScreen,
  Messages: MessageScreen,
  CreateConversation: CreateConversationScreen,
  Conversation: ConversationScreen,
  Account: AccountScreen,
  ChangeDetails: ChangeDetailsScreen

},{
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    header: null
  }
});

const authStack = createStackNavigator({
  Login: AuthScreen,
}, {
  defaultNavigationOptions: {
    header: null
  }
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
