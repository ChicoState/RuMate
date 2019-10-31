import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Dialog from 'react-native-dialog';

const InvitationList = () => {
    const [invitations, setInvitations] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [clickedItem, setClickedItem] = useState("");
    const [updateKey, setUpdateKey] = useState("");

    const getInvitations = () => {
        the_invitations = [];
        const invitationRef = firebase.database().ref('invites');
        invitationRef.on('value', function(snapshot) {
            let data = snapshot.val();
            for (let item in data)
            {
                if (firebase.auth().currentUser.uid == data[item].memberID)
                {
                    the_invitations.push(data[item]);
                }
            }
            setInvitations(the_invitations);
        });
    }

    const openDialog = (gid) => {
        setClickedItem(gid);
        setDialogVisible(true);
    }

    const cancel = () => {
        setDialogVisible(false);
    }

    const acceptInvitation = () => {
        //console.log("this is the id: " + clickedItem);
        setDialogVisible(false);

        console.log("ready for " + updateKey);
        firebase.database().ref('/users/' + updateKey).update(
            {
                rid: clickedItem
            }
        )
    }
    
    useEffect(() => {
        getInvitations();

        var users = firebase.database().ref('/users');
        users.once('value', function(snapshot) {
            snapshot.forEach(function(childSnap) {
                if (childSnap.val().uid == firebase.auth().currentUser.uid)
                {
                    setUpdateKey(childSnap.key);
                    //console.log(childSnap.key);
                }
            })
        });
    }, []);

    return(
        <View>
            {
                invitations.map((l, i) => (
                    <ListItem
                    onPress={() => openDialog(l.gid)}
                    key={i}
                    title={l.from}
                    rightIcon = {<Icon size={30} color='black' name="error-outline" />}
                    bottomDivider
                    />
                ))
                    
            }
            <Dialog.Container
            visible={dialogVisible}
            >
                <Dialog.Title>Accept Invitation</Dialog.Title>
                <Dialog.Description>
                    Do you want to accept this invitation.
                </Dialog.Description>
                <Dialog.Description>
                    Warning: You can only be a member of one group.
                </Dialog.Description>
                <Dialog.Button
                label="Decline"
                onPress={cancel}
                />
                <Dialog.Button
                label="Accept"
                onPress={acceptInvitation}
                />
            </Dialog.Container>
        </View>
    )
}

export default InvitationList;