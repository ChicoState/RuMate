import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Message from '../components/Message';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import * as Ani from 'react-native-animatable'
import firebase from 'firebase';

const MessageList = ({ id, recipient }) => {
  const [messages, setMessages] = useState([]);
  const [messageLength, setMessageLength] = useState(100);
  const getMessages = () => {
    setMessageLength(messageLength + 1)
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
          messageList.push(data[item]);
        }
      }
      setMessages(messageList.reverse())
      messageList = [];
    })
  }

  const renderMessages = () => {
    return (
      <FlatList style={styles.container}
        data={messages}
        keyExtractor={item => item.msgID}
        inverted={1}
        renderItem={(item) => {
          let sentToMe = false;
          if (item.item.senderID == firebase.auth().currentUser.uid) {
            sentToMe = true;
          }
          if (sentToMe) {
            animation = "fadeInRight"
          } else {
            animation = "fadeInLeft"
          }
          return (
            <Ani.View animation={animation} duration={500}>
              <Message 
                sentToMe={sentToMe}
                msg={item.item.text}
                time={item.item.time}
              />
            </Ani.View>
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
    height: "65%"
  }
});

export default MessageList;