import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import TaskList from '../components/TaskList';
import Icon from 'react-native-vector-icons/Foundation';

const PriorityScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <Header
        backgroundColor="#000"
        //leftComponent={<Icon name="calendar" size={30} color='white' onPress = {() => navigation.navigate('TaskCalendar')} />}
        centerComponent={{text: "Priority Assignments", style: {fontSize: 20, color: 'white'}}}
        //rightComponent={{icon: 'add-circle', color: 'white', onPress: () => navigation.navigate('CreateTask') }}
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

export default PriorityScreen;
