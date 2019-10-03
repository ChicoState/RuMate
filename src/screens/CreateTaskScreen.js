import React, {useState} from 'react';
import { View, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker';
import { SearchBar } from 'react-native-elements';

var firebase = require("firebase");

function addEntry(the_name, the_date, the_description) {
    /*var tasksList = firebase.database().ref().child('/tasks').push();
    tasksList.set({
        name: the_name,
        date: the_date,
        description: the_description,
        completed: false
    });
    */
   console.log(name);
}

function setDate(the_date) {
    date = the_date;
}

function setDescription(the_description) {
    description = the_description;
}

function nameSearch(the_text) {
    if (the_text == "d")
        console.log("hello");
    else
        console.log("hahahha");
}

const CreateTaskScreen = () => {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    return (
        <View>
            <SearchBar value={name} onChangeText={setName} placeholder="assignee name"></SearchBar>
            <DatePicker onDateChange={setDate} confirmBtnText="Confirm" cancelBtnText="Cancel"
            format="MM-DD-YYYY"
            />
            <TextInput value={description} onChangeText={setDescription} placeholder="task description"/>
            <TouchableOpacity onPress={() => {
                addEntry(name, date, description);
            }}>
                <Text>Enter</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CreateTaskScreen;