import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import TaskList from '../components/TaskList';
import Icon from 'react-native-vector-icons/Foundation';

const TasksScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <Header
        leftComponent={<Icon name="calendar" size={30} color='white' onPress = {() => navigation.navigate('TaskCalendar')} />}
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
