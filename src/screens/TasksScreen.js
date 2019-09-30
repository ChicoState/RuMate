import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import Task from '../components/Task';
import TaskList from '../components/TaskList';


const TasksScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <Header title="Tasks" />
      <Task task_name="David" description="Take out the trash"/>
      <TouchableOpacity onPress={() => {
        navigation.navigate('CreateTask');
      }}>
        <View style={styles.button}>
          <Text>Create Task</Text>
        </View>
      </TouchableOpacity>
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
