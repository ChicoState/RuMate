import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from 'react-native-elements';

export default class AddRoommateScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Header
                centerComponent={{text: "Add Roomates", style: {fontSize:20 }}}
                />
            </View>
        )
    }
}