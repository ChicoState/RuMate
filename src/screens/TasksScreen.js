import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import TaskList from '../components/TaskList';
import Icon from 'react-native-vector-icons/Foundation';
import * as Haptics from 'expo-haptics';

const TasksScreen = ({navigation}) => {
  useEffect(() => {
    Haptics.selectionAsync();
    navigation.addListener('willFocus', () =>{
      Haptics.selectionAsync();
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header
        backgroundColor="#000"
        leftComponent={<Icon name="calendar" size={30} color='white' onPress = {() => navigation.navigate('TaskCalendar')} />}
        centerComponent={{text: "Tasks", style: {fontSize: 20, color: 'white'}}}
        rightComponent={{icon: 'add-circle', color: 'white', onPress: () => navigation.navigate('CreateTask') }}
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
