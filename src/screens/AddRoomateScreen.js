import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button } from 'react-native-elements';

export default class AddRoommateScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View>
                <Header
                backgroundColor="#000"
                centerComponent={{text: "Add Roomates", style: {fontSize:20, color: 'white' }}}
                />

                <Button
                title="Create a roommate group"
                onPress={() => navigate('CreateRoommateGroup')}
                >
                </Button>
            </View>
        )
    }
}