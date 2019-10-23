import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Conversation from './Conversation';

const ConversationList = ({ navigation }) => {
  const [conversations, setConversations] = useState([])

  const renderConversations = () => {
    // pull all conversations
    /* 
      push conversations into a list to be rendered
    */
    if (conversations) {
      const list = [
        <Conversation
          name="NameTest"
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