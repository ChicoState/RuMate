import React,  {Component} from 'react';
import { View, FlatList, StyleSheet, Text, TouchableHighlight} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import Dialog from 'react-native-dialog';
import Dimensions from 'Dimensions';
import firebase from 'firebase';

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
    backgroundColor: "#c4e2ff",
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
          lastPressedItem: undefined,
          filter: 0,
          query: "",
          selectedIndex: 0,
        }
      this.updateIndex = this.updateIndex.bind(this)
    }

  componentWillMount() {
    this.getData();
  }

  getData() {
    if(this.state.filter == 0)
    {
      // console.log("filter = 0");
      const taskref = firebase.database().ref(`tasks/`);
      taskref.orderByChild("uid").equalTo(firebase.auth().currentUser.uid).on("value", snapshot => {
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
        });//setState

      });//taskref
    }//if
    else
    {
      // console.log("filter = 1");
      const userRef = firebase.database().ref(`users/`);
      userRef.orderByChild("uid").equalTo(firebase.auth().currentUser.uid).on("value", snapshot => {
        let users = snapshot.val();
        for(let item in users){
          // console.log(users[item].rid)
          curID = users[item].rid
        }
        this.setState({
          query: curID
        },
        () => {
        // console.log(this.state.query);
        const taskref = firebase.database().ref(`tasks/`);
        taskref.orderByChild("rid").equalTo(this.state.query).on("value", snapshot => {
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
          });//setState

        });//taskref
      }
      );
      });//userRef
    }//else

}//componentWillMount

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

  //change filter button
  updateIndex (selectedIndex) {
    this.setState(
    {
      selectedIndex,
      filter: selectedIndex,
    },
    () => {this.getData()}
    );
  }


render() {
  const { height } = Dimensions.get('window');

  const buttons = [ 'My Tasks', 'Roommate Tasks' ]
  const { selectedIndex } = this.state;

  return (
    <View style={{height}}>
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{height: 30}}
      />
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
