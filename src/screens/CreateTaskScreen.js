import React, {useState} from 'react';
import { View, Text, Stylesheet, TextInput } from 'react-native';

const CreateTaskScreen = () => {
    const [name, setName] = useState("");
    return (
        <View>
            <TextInput value={name} onChangeText={setName} placeholder="name"/>
        </View>
    )
}

export default CreateTaskScreen;