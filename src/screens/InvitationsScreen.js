import React from 'react';
import { View } from 'react-native';
import InvitationList from '../components/InvitationList';
import { Header } from 'react-native-elements';

const InvitationsScreen = () => {
    return(
        <View>
            <Header
            backgroundColor="#000"
            centerComponent={{text: "Invitations", style: {fontSize:30, color:'white'} }}
            />
            <InvitationList></InvitationList>
        </View>
    )
}

export default InvitationsScreen;