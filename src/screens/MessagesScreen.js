import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Header } from 'react-native-elements';
import Conversation from '../components/Conversation';
import Message from '../components/Message';

const MessageScreen = ({ navigation }) => {

  const renderConversations = () => {
    // pull all conversations
    return (
      <Conversation />
    );
  }

  return (
    <View>
      <Header
        backgroundColor="orange"
        leftComponent={{
          icon: 'arrow-back',
          onPress: () => navigation.navigate('Home')
        }}
        centerComponent={{
          text: "Messages",
          style: { fontSize: 20, color: 'black' }
        }}
        rightComponent={{
          icon: 'add-circle',
          onPress: () => navigation.navigate('CreateMessage') 
        }}
      />
      {renderConversations()}
    </View>
  );
}

const styles = StyleSheet.create({

});

export default MessageScreen;