import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { SearchBar, Button, Header } from 'react-native-elements';
import Dialog from 'react-native-dialog';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RoommateSearch from '../components/RoommateSearch.js'

var firebase = require("firebase");

export default class CreateTaskScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            date: "",
            description: "",
            uid: "",
            rid: "",
            complete: false,
            searchResults: [],
            dialogVisible: false
        };
        this.nameHandler = this.nameHandler.bind(this)
    }

    nameSearch() {
        var users_ref = firebase.database().ref('/users');

        let cur_data = [];

        users_ref.on('value', function(snapshot) {
            snapshot.forEach(function(childSnap) {
                cur_data.push(childSnap.val().name);
            });
        });

        this.setState({
            searchResults : cur_data
        });
    }

    addEntry(the_name, the_date, the_description, the_uid, the_rid) {
      // console.log(the_name);
      // console.log(the_uid);
      // console.log(the_rid);

        //TODO - DL: find a way to make the default date be today's date so that a user
        //does not need to specify the date if it's just today
        if (the_name == "" || the_description == "" || the_date == "")
        {
            this.setState({
                dialogVisible: true
            });
            return;
        }

        var tasksList = firebase.database().ref().child('/tasks').push();
        tasksList.set({
            name: the_name,
            uid: the_uid,
            rid: the_rid,
            date: the_date,
            description: the_description,
            completed: false
        });

        this.setState({
            name: "",
            uid: "",
            rid: "",
            date: "",
            description: "",
            completed: false
        });

        this.props.navigation.navigate('Tasks');
    }

    closeDialog = () => {
        this.setState({
            dialogVisible: false
        })
    }

    nameHandler(item) {
      let response = firebase.database().ref('users');
        response.orderByChild("name").equalTo(item).on("value", (snapshot) => {
          let data = snapshot.val();
          let userList = [];
          for (item in data) {
            userList.push(data[item]);
        this.setState({
          name: data[item].name,
          uid: data[item].uid,
          rid: data[item].rid
        });
        // console.log(this.state.description);
      }
      })
    }

    render() {
        return (
            <View>
                <Header
                    backgroundColor="#000"
                    leftComponent={<Icon name='arrow-back' size={30} color='white' onPress = { () => this.props.navigation.navigate('Tasks')} />}
                    centerComponent={{text: 'Create New Task', style: { fontSize: 20, color:"white"}}}
                />
                <RoommateSearch
                  nameHandler = {this.nameHandler}
                />
                {/*
                <SearchBar
                    value={this.state.name}
                    onChangeText={(name) => this.setState({name})}
                    onEndEditing={(name) => this.nameSearch({name})}
                    placeholder="assignee name"
                />
                */}
                <View style={styles.DescriptionSearch}>
                  <SearchBar
                      inputStyle={{backgroundColor: 'white', fontSize: 20, color: 'black'}}
                      inputContainerStyle={{backgroundColor: 'white'}}
                      containerStyle={{backgroundColor: 'white', borderColor: '#ccc', borderBottomColor: '#ccc', borderTopColor: '#ccc', borderWidth: 1, borderRadius: 4}}
                      value={this.state.description}
                      onChangeText={(description) => this.setState({description})}
                      placeholder="Task Description"
                      searchIcon={false}
                  />
                </View>

                <DatePicker
                    style={styles.DatePickerStyle}
                    onDateChange={(date) => this.setState({date})}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    format="YYYY-MM-DD"
                    date={this.state.date}
                />
                <View style={styles.EnterButtonView}>
                  <Button
                      title="Enter"
                      raised={true}
                      containerStyle={styles.EnterButtonContainer}
                      buttonStyle={{backgroundColor: 'black'}}
                      onPress={() => {this.addEntry(this.state.name, this.state.date, this.state.description, this.state.uid, this.state.rid);}}
                  >
                  </Button>
                </View>

                <Dialog.Container
                visible={this.state.dialogVisible}
                >
                    <Dialog.Title>Insufficient Data</Dialog.Title>
                    <Dialog.Description>Not every field has a valid entry value. Enter a value for every
                        field and try again.
                    </Dialog.Description>
                    <Dialog.Button
                    label='OK'
                    onPress={this.closeDialog}
                    >
                    </Dialog.Button>
                </Dialog.Container>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  DescriptionSearch: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  DatePickerStyle: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: 200,
  },
  EnterButtonContainer: {
    width: 200,
  },
  EnterButtonView: {
     width: '100%',
     justifyContent: 'center',
     alignItems: 'center'
  }
});
