import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase from 'firebase';
import Conversation from './Conversation';

const ConversationList = ({ navigation }) => {
  const [conversations, setConversations] = useState([])

  const getConversations = () => {
    // let response = firebase.database().ref("/messages");
    // response.on("value", (snapshot) => {
    //   let data = snapshot.val();
    //   console.log("from conversation screen " + data);
    // })
  }

  const renderConversations = () => {
    // pull all conversations
    /* 
      push conversations into a list to be rendered
    */
    if (conversations) {
      const list = [
        <Conversation
          name="Messanger2"
          blurb="Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Suspendisse pellentesque mollis
            lacus a euismod."
          navigation={navigation}
          key={1}
        />
      ];
      return list;
    } else {
      return <Text style={styles.noConv}>No messages</Text>
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