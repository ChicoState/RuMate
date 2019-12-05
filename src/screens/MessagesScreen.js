import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import ConversationList from '../components/ConversationList';
import * as Haptics from 'expo-haptics';

const MessageScreen = ({ navigation }) => {
  useEffect(() => {
    Haptics.selectionAsync();
    navigation.addListener('willFocus', () =>{
      Haptics.selectionAsync();
    });
  }, []);

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