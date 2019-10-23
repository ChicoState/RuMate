import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Message from '../components/Message';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import firebase from 'firebase';

const MessageList = ({ id, recipient }) => {
  const [messages, setMessages] = useState([]);
  const getMessages = () => {
    setMessages([])
    let response = firebase.database().ref('/messages');
    let users = firebase.database().ref('/users');
    let sender = "";
    users.on("value", (snapshot) => {
      let data = snapshot.val();
      for (let item in data) {
        if (firebase.auth().currentUser.uid == data[item].uid) {
          sender = data[item].name;
        }
      }
    })
    let messageList = [];
    response.on("value", (snapshot) => {
      let data = snapshot.val();
      for (let item in data) {
        if ((data[item].to == recipient && data[item].from == sender) ||
            (data[item].to == sender && data[item].from == recipient)) {
          console.log(data[item])
          messageList.push(data[item])
          setMessages(messageList);
        }
      }
    })
  }

  const renderMessages = () => {
    return (
      <FlatList style={styles.container}
        data={messages}
        keyExtractor={item => item.msgID}
        inverted={0}
        renderItem={(item) => {
          let sentToMe = false;
          if (item.item.senderID == firebase.auth().currentUser.uid) {
            sentToMe = true;
          }
          return (
            <Message 
              sentToMe={sentToMe}
              msg={item.item.text}
              time={item.item.time}
            />
          )
        }}
      />
    )
  }

  useEffect(() => {
    getMessages();
  }, []);

  return renderMessages();
}

const styles = StyleSheet.create({
  container: {
    height: "70%"
  }
});

export default MessageList;