import React from 'react';
import { View, Text, Stylesheet } from 'react-native';

var day = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear().toString().substring(2,4);
var date = month + '\\' + day + "\\" + year;
var assignee_completed = false;
var roommate_complete = false;

function isCompleted(completed) {
    if (completed)
        return "this is completed"
    else
        return "not yet completed"
}


const Task = ({task_name, description}) => {
    return (
        <View>
            <Text>{task_name} - {description} by {date} ({isCompleted(assignee_completed)}) </Text>
        </View>
    )

};

export default Task;