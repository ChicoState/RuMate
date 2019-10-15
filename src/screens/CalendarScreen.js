import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import TaskCalendar from '../components/Calendar.js'


export default class CalendarScreen extends Component {
  constructor(props) {
      super(props);
      this.state = {

      };
  }
  render() {
    return (
      <View style={{flex: 1}}>
      <Header
      centerComponent={{text: "Tasks", style: {fontSize: 20}}}
      />
      <TaskCalendar/>
      </View>
    );
  }
}
