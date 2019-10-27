import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import firebase from 'firebase';
import Conversation from './Conversation';

const ConversationList = ({ navigation }) => {
  const [conversations, setConversations] = useState([])

  const getConversations = () => {
    let userList = [];
    let sentMsgs = []
    let responseUsers = firebase.database().ref('users');
    let responseMessages = firebase.database().ref('messages');
    responseUsers.on("value", (snapshot) => {
      let data = snapshot.val();
      for (item in data) {
        if (data[item].uid !== firebase.auth().currentUser.uid)
          userList.push(data[item]); 
      }
      responseMessages.on('value', (snapshot) => {
        let messageData = snapshot.val();
        for (item in messageData) {
          if (messageData[item].senderID == firebase.auth().currentUser.uid) {
            sentMsgs.push(messageData[item])
          }
        }
        conversationList = []
        for (user in userList) {
          for (msg in sentMsgs) {
            if(userList[user].name == sentMsgs[msg].to) {
              if (!conversationList.includes(userList[user])) {
                conversationList.push(userList[user])
              }
            }
          }
        }
        setConversations(conversationList)
      })
    })
  }

  const renderConversations = () => {
    if (conversations) {
      return (
        <FlatList 
          data = {conversations}
          keyExtractor={item => item.uid}
          renderItem = {(item) => {
            return(
              <Conversation
                name={item.item.name}
                blurb="Figure this out later"
                navigation = {navigation}
              />
            )
          }}
        />
      )
    } else {
      return (
        <View style={{flex: 1}}>
          <Text style={styles.noName}>No messages</Text>
        </View>
      )
    }
  }

  useEffect(() => {
    getConversations();
  }, []);

  return (
    <View>
      {/* put in flatlist eventually */}
      {renderConversations()}
    </View>
  )
}

const styles = StyleSheet.create({
  noConv: {
    alignSelf: 'center',
    fontSize: 30,
    paddingTop: "30%",
  }
})

export default ConversationList;