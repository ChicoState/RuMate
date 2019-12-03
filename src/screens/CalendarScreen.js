import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import TaskCalendar from '../components/Calendar.js'
import Icon from 'react-native-vector-icons/MaterialIcons';


const CalendarScreen = ({navigation}) => {
    return (
      <View style={{flex: 1}}>
      <Header
      backgroundColor="#000"
      leftComponent={<Icon name='arrow-back' size={30} color='white' onPress = { () => navigation.navigate('Tasks')} />}
      centerComponent={{text: "Tasks", style: {fontSize: 20, color:'white'}}}
      />
      <TaskCalendar/>
      </View>
    );
}

export default CalendarScreen;
