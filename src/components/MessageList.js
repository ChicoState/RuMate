import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Conversation from './Conversation';

const MessageList = () => {
  const renderConversations = () => {
    // pull all conversations
    const list = [
      <Conversation
        name="RM name"
        blurb="Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Suspendisse pellentesque mollis
          lacus a euismod."
      />
    ];
    return list;
  }
  return (
    <View>
      {/* put in flatlist eventually */}
      {renderConversations()}
    </View>
  )
}

const styles = StyleSheet.create({

})

export default MessageList;