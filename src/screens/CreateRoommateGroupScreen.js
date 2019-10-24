import React, { Component, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Header, Input, SearchBar, ListItem, Button } from 'react-native-elements';

var firebase = require("firebase");

const CreateRoommateGroupScreen = ({}) => {
    const [searchName, setSearchName] = useState("");
    const [groupName, setGroupName] = useState("");
    const [newMembers, setNewMembers] = useState([]);

    const nameSearch = () => {
        var users_ref = firebase.database().ref('/users');

        users_ref.on('value', function(snapshot) {
            let data = snapshot.val();
            for (let item in data)
            {
                if (searchName == data[item].name)
                {
                    alert(searchName + " has been added to this group");
                    setNewMembers([...newMembers, data[item]])
                }
            }
        });
    }

    const renderItem = ({ item }) => (
        <ListItem
        title={item.name}
        />
    )

    const addEntry = () => {
        var roomateList = firebase.database().ref().child('/groups').push();
        roomateList.set({
            name: groupName,
            members: newMembers
        })
    }

    return (
        <View>
            <Header
            centerComponent={{ text: "Create a Roommate Group", style: {fontSize:30} }}
            />
            <Input
            placeholder="Group name"
            value={groupName}
            onChangeText={setGroupName}
            round={true}
            />
            <SearchBar
            value={searchName}
            onChangeText={setSearchName}
            onEndEditing={nameSearch}
            placeholder="Member name"
            round={true}
            inputContainerStyle={{backgroundColor: 'white'}}
            containerStyle={{backgroundColor: 'white'}}
            />
            <FlatList
            data={newMembers}
            keyExtractor={item => item.userID}
            renderItem={renderItem}
            extraData={true}
            />
            <Button
            title="Create new roommate group"
            onPress={addEntry}
            />
        </View>
    )
}

export default CreateRoommateGroupScreen;