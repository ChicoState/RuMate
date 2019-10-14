import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import TaskList from '../components/TaskList';

const TasksScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <Header
        leftComponent={{icon: "menu", onPress: () => navigation.navigate('TaskCalendar') }}
        centerComponent={{text: "Tasks", style: {fontSize: 20}}}
        rightComponent={{icon: 'add-circle', onPress: () => navigation.navigate('CreateTask') }}
      />
      <TaskList/>
    </View>
  );
}

const styles = StyleSheet.create({
  // styles
  button: {
    marginHorizontal: 5,
    alignSelf: 'center',
    marginVertical: 5
  }
});

export default TasksScreen;
