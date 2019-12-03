import React,  {Component} from 'react';
import { View, FlatList, StyleSheet, Text, TouchableHighlight,} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
var firebase = require("firebase");

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskDates: [],
      marked: null,
      items: {}
    };
  }

  componentDidMount() {
    this.markCalendar();
  }

  markCalendar = () => {
    // console.log(this.state.taskDates);
  var obj = this.state.taskDates.reduce((c, v) => Object.assign(c, {[v]: {selected: true,marked: true}}), {});
  this.setState({ marked : obj});
}

  componentWillMount() {
    const userRef = firebase.database().ref(`users/`);
    userRef.orderByChild("uid").equalTo(firebase.auth().currentUser.uid).on("value", snapshot => {
      let user = snapshot.val();
      let user_rid;
      for(let i in user)
      {
        user_rid = user[i].rid;
      }
      const taskRef = firebase.database().ref(`tasks/`);
      taskRef.orderByChild("rid").equalTo(user_rid).on("value", snapshot => {

        let tasks = snapshot.val();

        let newState = [];

        for(let item in tasks){
          if (tasks[item].completed == false)
          {
            // console.log(tasks[item]);
            newState.push(
              tasks[item].date
            );

            var date = tasks[item].date;
            if(!this.state.items[date]){
              this.state.items[date] = [];
            }
                this.state.items[date].push({
                  name: tasks[item].name,
                  description: tasks[item].description,
                  height: 100
                });
          }
        }

        this.setState({
          taskDates: newState,
        });

    });//taskRef

  });//userRef
}

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={Date()}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        markedDates={this.state.marked}
      />
    );
  }

  loadItems(day) {

    //add empty days
      for (let i = 0; i < 40; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
        }
      }
      // console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}>
        <Text style={styles.nameBlock}>{item.name}</Text>
        <Text style={styles.taskBlock}>{item.description}</Text>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>Empty</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  nameBlock: {
    flex: 1,
    fontSize: 25
  },
  taskBlock: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 10,
    flex:1,
    paddingTop: 30
  }
});
