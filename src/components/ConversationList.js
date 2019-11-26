import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import firebase from 'firebase';
import Conversation from './Conversation';

const ConversationList = ({ navigation }) => {
  const [conversations, setConversations] = useState([])

  const getConversations = () => {
    let userList = [];
    let sentMsgs = []
    let name = ""
    let responseUsers = firebase.database().ref('users');
    let responseMessages = firebase.database().ref('messages');
    responseUsers.on("value", (snapshot) => {
      let data = snapshot.val();
      for (item in data) {
        if (data[item].uid !== firebase.auth().currentUser.uid) {
          userList.push(data[item]);
        } else {
          name = data[item].name
        }
      }
      responseMessages.on('value', (snapshot) => {
        let messageData = snapshot.val();
        for (item in messageData) {
          // if message was sent or sent to me
          if (messageData[item].senderID == firebase.auth().currentUser.uid ||
              messageData[item].to == name) {
            sentMsgs.push(messageData[item])
          }
        }

        conversationList = []
        userDataList = []
        for (user in userList) {
          for (msg in sentMsgs) {
            // if message was sent to user OR if user sent a message to me
            if(userList[user].name == sentMsgs[msg].to ||
              userList[user].name == sentMsgs[msg].from) {
              if (!userDataList.includes(userList[user])) {
                userDataList.push(userList[user])
                let userData = userList[user]
                let text = sentMsgs[sentMsgs.length - 1].text
                conversationList.push({
                  user: userData,
                  text 
                })
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
        <FlatList style={{height: "100%"}}
          data = {conversations}
          keyExtractor={item => item.user.uid}
          renderItem = {(item) => {
            console.log(item)
            return(
              <Conversation
                name={item.item.user.name}
                // blurb={item.item.text}
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