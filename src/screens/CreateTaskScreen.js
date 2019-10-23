import React, {Component} from 'react';
import { View, Text } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { SearchBar, Button, Header } from 'react-native-elements';
import Dialog from 'react-native-dialog';
import Icon from 'react-native-vector-icons/MaterialIcons';

var firebase = require("firebase");

export default class CreateTaskScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            date: "",
            description: "",
            complete: false,
            searchResults: [],
            dialogVisible: false
        };
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

    addEntry(the_name, the_date, the_description) {

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
            date: the_date,
            description: the_description,
            completed: false
        });

        this.setState({
            name: "",
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

    render() {
        return (
            <View>
                <Header
                    leftComponent={<Icon name='arrow-back' size={30} color='black' onPress = { () => this.props.navigation.navigate('Tasks')} />}
                    centerComponent={{text: 'Create a task', style: { fontSize: 20}}}
                />
                <SearchBar
                    value={this.state.name}
                    onChangeText={(name) => this.setState({name})}
                    onEndEditing={(name) => this.nameSearch({name})}
                    placeholder="assignee name"
                />

                <SearchBar
                    value={this.state.description}
                    onChangeText={(description) => this.setState({description})}
                    placeholder="task description"
                    searchIcon={false}
                />

                <DatePicker
                    onDateChange={(date) => this.setState({date})}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    format="YYYY-MM-DD"
                    date={this.state.date}
                />

                <Button
                    title="Enter"
                    onPress={() => {this.addEntry(this.state.name, this.state.date, this.state.description);}}
                >
                </Button>

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
