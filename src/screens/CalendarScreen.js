import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import TaskCalendar from '../components/Calendar.js'


const CalendarScreen = ({navigation}) => {
    return (
      <View style={{flex: 1}}>
      <Header
      leftComponent={{icon: "menu", onPress: () => navigation.navigate('Tasks')}}
      centerComponent={{text: "Tasks", style: {fontSize: 20}}}
      />
      <TaskCalendar/>
      </View>
    );
}

export default CalendarScreen;
