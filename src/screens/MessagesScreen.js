import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import ConversationList from '../components/ConversationList';

const MessageScreen = ({ navigation }) => {
  return (
    <View>
      <Header
        backgroundColor="purple"
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
          onPress: () => navigation.navigate('CreateConversation') 
        }}
      />
      <ConversationList navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({

});

export default MessageScreen;