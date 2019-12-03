import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
                leftComponent={<Icon name='arrow-back' size={30} color='white' onPress = { () => navigate('Home')} />}
                centerComponent={{text: "Add Roomates", style: {fontSize:20, color: 'white' }}}
                />

                <Button
                title="Create a new roommate group"
                onPress={() => navigate('CreateRoommateGroup')}
                >
                </Button>
            </View>
        )
    }
}