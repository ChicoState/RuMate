import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, View, TextInput } from 'react-native';
import { Header } from 'react-native-elements';
import firebase from 'firebase';
import MessageList from '../components/MessageList';
import Icon  from 'react-native-vector-icons/Ionicons';

const ConversationScreen = ({ navigation }) => {
  const name = navigation.state.params.name;
  const [input, setInput] = useState("");
  const [conversationID, setConversationID] = useState("");

  const submitMessage = () => {
    let date = new Date();
    let time = date.toLocaleString('en-US', { 
      hour: 'numeric',
      minute: 'numeric',
      hour12: true 
    })
    let msg = firebase.database().ref().child('/messages').push();
    let recipientID = "";
    let from = "";
    let response = firebase.database().ref('/users');
    let haveSender = false;
    let haveRec = false;
    response.on('value', async (snapshot) => {
      let data = await snapshot.val();
      for (i in data) {
        if (firebase.auth().currentUser.uid == data[i].uid) {
          from = data[i].name;
          haveSender = true;
        }
        if (name == data[i].name) {
          recipientID = data[i].uid;
          haveRec = true;
        }
        if (haveRec && haveSender) {
          haveSender = haveRec = false;
          msg.set({
            to: name,
            from: from,
            time: time,
            convID: firebase.auth().currentUser.uid + recipientID,
            msgID: name + time + from + date.getMilliseconds(),
            text: input,
            senderID: firebase.auth().currentUser.uid
          })
          setConversationID(firebase.auth().currentUser.uid + recipientID);
          setInput("");
          break;
        }
      }
    })
    
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <Header
        backgroundColor="green"
        leftComponent={{icon: 'arrow-back', onPress: () => navigation.navigate('Messages') }}
        centerComponent={{text: name, style: {fontSize: 20, color: 'black'}}}
      />
      <MessageList id = {conversationID} recipient={name}/>
      <View style={styles.inputSection}>
        <TextInput style={styles.textInput}
            value={input}
            onChangeText={setInput}
            placeholder="Message"
            multiline
            autoFocus
        />
        <Icon style={styles.send} name="md-send" size={30}
          onPress={submitMessage}
        />
      </View>
      
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputSection: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    borderColor: 'black',
    borderTopWidth: 1,
    height: "100%"
  },
  send: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: 'blue'
  },
  textInput: {
    width: "90%",
    height: "100%",
    marginBottom: "25%",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
});

export default ConversationScreen;