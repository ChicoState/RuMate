import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import firebase from 'firebase';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons'

const InvitationList = () => {
    const [invitations, setInvitations] = useState([]);
    const [clickedItemGID, setClickedItemGID] = useState("");
    const [userKey, setUserKey] = useState("");
    const [canAccept, setCanAccept] = useState(false);

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

    const leaveGroup = (gid, iid) => {
        setClickedItemGID(gid);
        Alert.alert(
          'Already in a Group',
          'Would you like to leave your current Group?',
          [
            { text: 'Yes', onPress: () => {
              setCanAccept(true);
              firebase.database().ref('/users/' + userKey).update(
                  {
                      rid: -1
                  }
              );
            }},
            { text: 'No', onPress: () => removeInvite(gid, iid), style:'cancel'}
          ]
        )
    }

    const removeInvite = (gid, iid) => {
      Alert.alert(
        'Remove Invite',
        'Do you want to remove this invite?',
        [
          { text: 'Yes', onPress: () => {
            let data = firebase.database().ref('invites')
            data.on('value', (snapshot)=>{
              let invites = snapshot.val()
              for (invite in invites) {
                if (invites[invite].inviteID == iid) {
                  firebase.database().ref('invites/'+invite).remove();
                }
              }
            });
            getInvitations();
          }},
          { text: 'No',style:'cancel'}
        ]
      )
    }

    const joinGroup = (gid, iid) => {
      Alert.alert(
        'Accept Invitation',
        'Warning: You can only be a member of one group',
        [
          { text: 'Yes', onPress: () => {
            firebase.database().ref('/users/' + userKey).update(
                {
                    rid: gid
                }
            );
            setCanAccept(false);
            let data = firebase.database().ref('invites')
            data.on('value', (snapshot)=>{
              let invites = snapshot.val()
              for (invite in invites) {
                if (invites[invite].inviteID == iid) {
                  firebase.database().ref('invites/'+invite).remove();
                }
              }
            });
            getInvitations();
          }},
          { text: 'No', style:'cancel'}
        ]
      )
    }

    useEffect(() => {
        getInvitations();

        var users = firebase.database().ref('/users');
        users.once('value', function(snapshot) {
            snapshot.forEach(function(childSnap) {
                if (childSnap.val().uid == firebase.auth().currentUser.uid)
                {
                    setUserKey(childSnap.key);
                    if (childSnap.val().rid == -1)
                    {
                        setCanAccept(true);
                    }
                }
            })
        });
    }, []);

    return(
        <View>
            {
                invitations.map((l, i) => (
                    <ListItem
                    onPress={() => {
                      if(!canAccept)
                      {
                        leaveGroup(l.gid, l.inviteID)
                      }
                      else
                      {
                        joinGroup(l.gid, l.inviteID)
                      }
                    }}
                    key={i}
                    title={l.from}
                    rightIcon = {<Icon size={30} color='black' name="error-outline" />}
                    bottomDivider
                    />
                ))

            }

        </View>
    )
}

export default InvitationList;
