import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Header, Input, SearchBar, ListItem, Button } from 'react-native-elements';

var firebase = require("firebase");

export default class CreateRoommateGroupScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            new_members: [],
            new_member_name: "",
            group_name: ""
        }
    }

    nameSearch = () => {
        var cur_members = this.state.new_members;
        var search_name = this.state.new_member_name;
        var users_ref = firebase.database().ref('/users');

        var cur_data = [];

        users_ref.on('value', function(snapshot) {
            snapshot.forEach(function (childSnap) {
                console.log(search_name)
                if (childSnap.val().name == search_name)
                {
                    alert(search_name + " has been added to this group");
                    cur_members.push(childSnap.val().name)
                }
            });
        });

        /*if (cur_data.length == 0)
        {
            alert("No users match \'" + search_name + "\'");
        }
        else
        {
            cur_members.push(cur_data[0]);
        }
        */

        this.setState({
            new_members: cur_members
        })

        console.log(cur_members)
        console.log(this.state.new_members)
    }

    renderItem = ({ item }) => (
        <ListItem
        title={item}
        />
    )

    keyExtractor = (item, index) => {
        index.toString();
    }

    addEntry(the_name, the_members) {
        var roomateList = firebase.database().ref().child('/groups').push();
        roomateList.set({
            name: the_name,
            members: the_members
        })
    }

    render() {
        return (
            <View>
                <Header
                centerComponent={{ text: "Create a Roommate Group", style: {fontSize:30} }}
                />
                <Input
                placeholder="Group name"
                value={this.state.group_name}
                onChangeText={(group_name) => this.setState({group_name})}
                round={true}
                />
                <SearchBar
                value={this.state.new_member_name}
                onChangeText={(new_member_name) => this.setState({new_member_name})}
                onEndEditing={(new_member_name) => this.nameSearch({new_member_name})}
                placeholder="Member name"
                round={true}
                inputContainerStyle={{backgroundColor: 'white'}}
                containerStyle={{backgroundColor: 'white'}}
                />
                <FlatList
                data={this.state.new_members}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                extraData={true}
                />
                <Button
                title="Create new roommate group"
                onPress={() => { this.addEntry(this.state.group_name, this.state.new_members) }}
                />
            </View>
        )
    }
}