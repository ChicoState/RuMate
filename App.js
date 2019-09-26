import React from 'react';
import { Text, StyleSheet, Button } from 'react-native';
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
