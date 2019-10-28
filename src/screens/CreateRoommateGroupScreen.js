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

        var new_gid = "01234" + firebase.auth().currentUser.uid;

        var cur_user;
        var users = firebase.database().ref('/users');
        users.once('value', function(snapshot) {
            let data = snapshot.val();
            for (let item in data)
            {
                if (firebase.auth().currentUser.uid == data[item].uid)
                {
                    cur_user = data[item];
                }
            }
        })

        roomateList.set({
            gid: new_gid,
            name: groupName,
            members: [cur_user]
        });

        //TODO - DL: would prefer for the invites to just be a subfield of the users
        //database as opposed to a new invites database
        for (let the_member in newMembers)
        {
            var invites = firebase.database().ref().child('/invites').push();
            invites.set({
                memberID: newMembers[the_member].uid,
                from: groupName,
                gid: new_gid
            })
        }
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