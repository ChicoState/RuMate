import React from 'react';
import { View } from 'react-native';
import InvitationList from '../components/InvitationList';
import { Header } from 'react-native-elements';

const InvitationsScreen = () => {
    return(
        <View>
            <Header
            centerComponent={{text: "Invitations", style: {fontSize:30} }}
            />
            <InvitationList></InvitationList>
        </View>
    )
}

export default InvitationsScreen;