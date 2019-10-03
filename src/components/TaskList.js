import React,  {Component} from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, Text,} from 'react-native';
import FlatListData from '../components/FlatListData.js'
var firebase = require("firebase");

class FlatListItem extends Component {

    render() {
      return (
        <View style={{
          flex: 1,
          backgroundColor: "#858585",
          borderRadius: 4,
          borderWidth: 0.5,
          borderColor: 'black',
          marginHorizontal: 2,
          marginVertical: 1,
          fontSize: 32
        }}>
          <Text style={styles.FlatListItem}> {this.props.item.name}           {this.props.item.description}         {this.props.item.date}</Text>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  flatListItem: {
    color: 'white',
    padding: 10,
    fontSize: 30
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

  componentDidMount() {
    const taskref = firebase.database().ref(`tasks/`);

    taskref.on("value", snapshot => {

      let tasks = snapshot.val();

      console.log(tasks);

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
