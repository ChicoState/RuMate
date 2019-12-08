import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Header, Input, SearchBar, ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

var firebase = require("firebase");

const CreateRoommateGroupScreen = ({navigation}) => {
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
        var cur_user_key;
        var users = firebase.database().ref('/users');

        users.once('value', function(snapshot) {
            snapshot.forEach(function(childSnap) {
                if (childSnap.val().uid == firebase.auth().currentUser.uid)
                {
                    cur_user = childSnap.val();
                    cur_user_key = childSnap.key;
                }
            })
        });


        firebase.database().ref('/users/' + cur_user_key).update({
            rid: new_gid
        });

        roomateList.set({
            gid: new_gid,
            name: groupName,
        });

        /*memberList.child(new_gid).set({
            uid : cur_user.uid,
            accepted : "true"
        });
        */

        //TODO - DL: would prefer for the invites to just be a subfield of the users
        //database as opposed to a new invites database
        for (let the_member in newMembers)
        {
            var invites = firebase.database().ref().child('/invites').push();
            invites.set({
                inviteID: new_gid+ newMembers[the_member].uid + groupName,
                memberID: newMembers[the_member].uid,
                from: groupName,
                gid: new_gid
            })
        }
        navigation.navigate('AddRoommate')
    }

    return (
        <View>
            <Header
            backgroundColor="#000"
            leftComponent={<Icon name='arrow-back' size={30} color='white' onPress = { () => navigation.navigate('AddRoommate')} />}
            centerComponent={{ text: "Create New Group", style: {fontSize:20, color:"white"} }}
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
