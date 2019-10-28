import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import Invitation from './Invitation';

import firebase from 'firebase';

const InvitationList = ({navigation}) => {
    const [invitations, setInvitations] = useState([]);

    const getInvitations = () => {
        const invitationRef = firebase.database().ref('invites');
        invitationRef.on('value', function(snapshot) {
            let data = snapshot.val();
            for (let item in data)
            {
                if (firebase.auth().currentUser.uid == data[item].memberID)
                {
                    setInvitations([...invitations, data[item]]);
                }
            }
        });
    }
    
    useEffect(() => {
        getInvitations();
    }, []);

    const renderInvitations = () => {
        if (invitations)
        {
            return(
                <FlatList
                data = {invitations}
                keyExtractor = {item => item.memberID}
                renderItem = {(item) => {
                    console.log(item);
                    return(
                        <Invitation
                        name={item.item.from}
                        navigation={navigation}
                        />
                    )
                }}
                />
            )
        }
        else {
            return(
                <Text>No invitations currently</Text>
            )
        }
    }

    return(
        <View>
            {renderInvitations()}
        </View>
    )
}

export default InvitationList;