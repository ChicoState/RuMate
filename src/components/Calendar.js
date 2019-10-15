import React,  {Component} from 'react';
import { View, FlatList, StyleSheet, Text, TouchableHighlight,} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

export default class TaskCalendar extends Component {
  constructor(props) {
        super(props);
        this.state = {

        }
    }

render() {
  return (
    <View style={{flex: 1}}>
      <Calendar
      markedDates={{
    '2019-10-16': {selected: true, marked: true, selectedColor: 'blue'},
    '2019-10-17': {marked: true},
    '2019-10-18': {marked: true, dotColor: 'red', activeOpacity: 0},
  }}
      // Initially visible month. Default = Date()
      current={'2019-10-09'}
      // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
      minDate={'2012-05-10'}
      // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
      maxDate={'2020-05-30'}
      // Handler which gets executed on day press. Default = undefined
      onDayPress={(day) => {console.log('selected day', day)}}
      // Handler which gets executed on day long press. Default = undefined
      onDayLongPress={(day) => {console.log('selected day', day)}}
      // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
      monthFormat={'MMMM yyyy'}
      // Handler which gets executed when visible month changes in calendar. Default = undefined
      onMonthChange={(month) => {console.log('month changed', month)}}
      // Hide month navigation arrows. Default = false
      hideArrows={false}
      // Replace default arrows with custom ones (direction can be 'left' or 'right')
      // renderArrow={(direction) => (<Arrow />)}
      // Do not show days of other months in month page. Default = false
      hideExtraDays={true}
      // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
      // day from another month that is visible in calendar page. Default = false
      disableMonthChange={true}
      // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
      firstDay={1}
      // Hide day names. Default = false
      hideDayNames={true}
      // Show week numbers to the left. Default = false
      showWeekNumbers={false}
      // Handler which gets executed when press arrow icon left. It receive a callback can go back month
      onPressArrowLeft={substractMonth => substractMonth()}
      // Handler which gets executed when press arrow icon left. It receive a callback can go next month
      onPressArrowRight={addMonth => addMonth()}
      />
    </View>
  );
}
}
