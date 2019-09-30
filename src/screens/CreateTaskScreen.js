import React, {useState} from 'react';
import { View, Text, Stylesheet, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

var firebase = require("firebase");

function addEntry(the_name, the_date, the_description) {
    firebase.database().ref('/tasks').set({
        name: the_name,
        date: the_date,
        description: the_description
    });
}

function setName(the_name) {
    name = the_name;
}

function setDate(the_date) {
    date = the_date;
}

function setDescription(the_description) {
    description = the_description;
}

const CreateTaskScreen = () => {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    return (
        <View>
            <TextInput value={name} onChangeText={setName} placeholder="assignee name"/>
            <TextInput value={date} onChangeText={setDate} placeholder="due date"/>
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