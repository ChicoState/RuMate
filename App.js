import React from 'react';
import { StyleSheet, Button } from 'react-native';
import { useScreens } from 'react-native-screens';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import TasksScreen from './src/screens/TasksScreen';
import LoginScreen from './src/screens/LoginScreen';
import CreateTaskScreen from './src/screens/CreateTaskScreen';
useScreens();

//TODO: DL - this is very inefficient to include the entire firebase SDK
//we will need to update to only include specific SDK's once we have a better
//idea of which ones we need
var firebase = require("firebase");

var firebaseConfig = {
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

// Add extra tabs here
const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
  },
  Tasks: {
    screen: TasksScreen,
  },
// next screen here {
//  screen: 
// },
},{
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    gesturesEnabled: false
  }
});

const taskNavigator = createStackNavigator({
  CreateTask: CreateTaskScreen,
}, {
  defaultNavigationOptions: {
    headerLeft: ({ scene }) => {
      // destructure navigate function off of props.scene
      const { navigate } = scene.descriptor.navigation;
      return (
        <Button style={styles.headerLeft}
          title="Back"
          onPress={() => {
            // navigate back to tasks screen
            navigate('Tasks');
          }}
        />
      );
    },
  }
});

// Add extra screens here
const mainStackNavigator = createStackNavigator({
  Login: LoginScreen,
  Main: TabNavigator,
  CreateTask: taskNavigator,
},{
  initialRouteName: 'Login',
  defaultNavigationOptions: {
    headerLeft: null,
    header: null,
    gesturesEnabled: false
  }
});

const App = createAppContainer(mainStackNavigator);

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
