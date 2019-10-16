import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header, Input, SearchBar, ListItem } from 'react-native-elements';

var firebase = require("firebase");

var members = []

export default class CreateRoommateGroupScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            new_member_name: ""
        }
    }

    nameSearch() {
        var users_ref = firebase.database().ref('/users');

        var cur_data = [];

        users_ref.on('value', function(snapshot) {
            console.log(here)
            snapshot.forEach(function (childSnap) {
                cur_data.push(childSnap.val().name)
            });
        });

        console.log(cur_data);
    }

    render() {
        return (
            <View>
                <Header
                centerComponent={{ text: "Create a Roommate Group", style: {fontSize:30} }}
                />
                <Input
                placeholder="Group name"
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
                {
                    members.map((the_item, the_key) => (
                        <ListItem
                        key={the_key}
                        title={the_item.name}
                        subtitle={the_item.role}
                        />
                    ))
                }
            </View>
        )
    }
}