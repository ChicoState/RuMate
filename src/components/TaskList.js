import React,  {Component} from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, Text,} from 'react-native';
var firebase = require("firebase");

class FlatListItem extends Component {

    render() {
      return (
        <View style={styles.itemBlock}>
          <Text style={styles.taskName}>   {this.props.item.name} </Text>
          <Text style={styles.taskDescription}>   {this.props.item.description} </Text>
          <Text style={styles.taskDate}>   {this.props.item.date} </Text>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  itemBlock: {
    flex: 1,
    backgroundColor: "#71bd89",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 2,
    marginVertical: 1,
  },
  taskName: {
    fontSize: 32
  },
  taskDescription: {
    fontSize: 12
  },
  taskDate: {
    fontSize: 12
  }
});

var flatlistData = [];
export default class TaskList extends Component {
  constructor(props) {
        super(props);
        this.state = {
          flatlistData: [],
        }
    }

  componentWillMount() {
    const taskref = firebase.database().ref(`tasks/`);

    taskref.on("value", snapshot => {

      let tasks = snapshot.val();

      let newState = [];

      for(let item in tasks){
        newState.push({
          name: tasks[item].name,
          description: tasks[item].description,
          date: tasks[item].date,
        });
      }

      this.setState({
        flatlistData: newState
      });

  });
}


render() {
  return (
    <View style={{flex: 1, marginTop: 22}}>
      <FlatList
        data={this.state.flatlistData}
        getItemLayout={(data, index) => (
          {length: 20, offset: 20 * index, index}
          )}
        renderItem={({ item, index })=>{
          return (
            <FlatListItem
            item={item}
            index={index}>
            </FlatListItem>);
        }}
      />
    </View>
  );
}
}
