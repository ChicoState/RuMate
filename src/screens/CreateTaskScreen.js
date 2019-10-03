import React, {Component} from 'react';
import { View, Text } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { SearchBar, Button } from 'react-native-elements';

var firebase = require("firebase");

export default class CreateTaskScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            date: "",
            description: "",
            complete: false
        };
    }

    nameSearch() {
        console.log(this.state.name);
    }

    addEntry(the_name, the_date, the_description) {
        var tasksList = firebase.database().ref().child('/tasks').push();
        tasksList.set({
            name: the_name,
            date: the_date,
            description: the_description,
            completed: false
        });
    }

    render() {
        return (
            <View>
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
                />

                <DatePicker 
                    onDateChange={(date) => this.setState({date})} 
                    confirmBtnText="Confirm" 
                    cancelBtnText="Cancel"
                    format="MM-DD-YYYY"
                    date={this.state.date}
                />
                
                <Button
                    title="Enter"
                    onPress={() => {this.addEntry(this.state.name, this.state.date, this.state.description);}}
                >
                    <Text>Enter</Text>
                </Button>
            </View>
        )
    }
}