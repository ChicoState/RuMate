import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import ConversationList from '../components/ConversationList';

const MessageScreen = ({ navigation }) => {
  return (
    <View>
      <Header
        backgroundColor="#000"
        // leftComponent={{
        //   icon: 'arrow-back',
        //   onPress: () => navigation.navigate('Home')
        // }}
        centerComponent={{
          text: "Messages",
          style: { fontSize: 20, color: 'white' }
        }}
        rightComponent={{
          icon: 'add-circle',
          onPress: () => navigation.navigate('CreateConversation'),
          color: 'white'
        }}
      />
      <ConversationList navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({

});

export default MessageScreen;