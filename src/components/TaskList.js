import React,  {Component} from 'react';
import { View, FlatList, StyleSheet, Text, TouchableHighlight,} from 'react-native'; 
import Dialog from 'react-native-dialog';
var firebase = require("firebase");

class FlatListItem extends Component {

    render() {
      return (
        <View style={styles.itemBlock}>
          <View style={styles.nameBlock}>
            <Text style={styles.taskName}>{this.props.item.name} </Text>
          </View>
          <View style={styles.taskBlock}>
            <Text style={styles.taskDescription}>{this.props.item.description} </Text>
            <Text style={styles.taskDate}>{this.props.item.date} </Text>
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    marginBottom: 20
  },
  itemBlock: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 10,
    backgroundColor: "#71bd89",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 3,
    marginVertical: 1,
    justifyContent: 'space-between'
  },
  nameBlock: {
    flex: 3,
    flexWrap: 'wrap'
  },
  taskBlock: {
    flex: 4,
    marginLeft:10,
  },
  taskName: {
    marginLeft: 10,
    fontSize: 25,
    justifyContent: 'center'
  },
  taskDescription: {
    fontSize: 20,
    flexWrap: 'wrap'
  },
  taskDate: {
    fontSize: 15
  }
});

var flatlistData = [];
export default class TaskList extends Component {
  constructor(props) {
        super(props);
        this.state = {
          flatlistData: [],
          dialogVisible: false,
          lastPressedItem: undefined
        }
    }

  componentWillMount() {
    const taskref = firebase.database().ref(`tasks/`);

    taskref.on("value", snapshot => {

      let tasks = snapshot.val();

      let newState = [];

      for(let item in tasks){
        if (tasks[item].completed == false)
        {
          newState.push({
            name: tasks[item].name,
            description: tasks[item].description,
            date: tasks[item].date,
            completed: tasks[item].completed,
            key: item
          });
        }
      }

      this.setState({
        flatlistData: newState
      });

  });
}

  markAsCompleted = () => {
    this.setState({
      dialogVisible: false
    });

    firebase.database().ref('tasks/' + this.state.lastPressedItem.key).update({
      completed: true
    });
  }

  openDialog(item) {
    this.setState({
      lastPressedItem: item,
      dialogVisible: true
    });
  }

  cancel = () => {
    this.setState({
      dialogVisible: false
    });
  }


render() {
  return (
    <View>
      <FlatList
        data={this.state.flatlistData}
        getItemLayout={(data, index) => (
          {length: 20, offset: 20 * index, index}
          )}
        renderItem={({ item, index, separators })=>{
          return (
            <TouchableHighlight
            onPress={() => this.openDialog(item) }
            onShowUnderlay={separators.highlight}>
              <FlatListItem
              item={item}
              index={index}>
              </FlatListItem>
            </TouchableHighlight>);
        }}
      />
      <Dialog.Container
      visible={this.state.dialogVisible}
      >
        <Dialog.Title>Complete a Task</Dialog.Title>
        <Dialog.Description>
          Do you want to mark this task as completed?
        </Dialog.Description>
        <Dialog.Button
        label='No'
        onPress={this.cancel}
        >
        </Dialog.Button>
        <Dialog.Button
        label='Yes'
        onPress={this.markAsCompleted}
        >        
        </Dialog.Button>
      </Dialog.Container>
    </View>
  );
}
}
