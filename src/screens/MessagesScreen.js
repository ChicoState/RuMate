import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Header } from 'react-native-elements';
import MessageList from '../components/MessageList';

const MessageScreen = ({ navigation }) => {
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
      <MessageList navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({

});

export default MessageScreen;