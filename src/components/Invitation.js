import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

const Invitation = ({name, navigation}) => {
    return(
        <View>
            <Text>{name}</Text>
        </View>
    )
}

export default Invitation;