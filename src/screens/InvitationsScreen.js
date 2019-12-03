import React from 'react';
import { View } from 'react-native';
import InvitationList from '../components/InvitationList';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons'

const InvitationsScreen = ({navigation}) => {
    return(
        <View>
            <Header
            backgroundColor="#000"
            leftComponent={<Icon name='arrow-back' size={30} color='white' onPress = { () => navigation.navigate('Home')} />}
            centerComponent={{text: "Invitations", style: {fontSize:30, color:'white'} }}
            />
            <InvitationList></InvitationList>
        </View>
    )
}

export default InvitationsScreen;