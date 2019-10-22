import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';

const ConversationScreen = ({ navigation }) => {
  const name = navigation.state.params.name;
  return (
    <View>
      <Header
        backgroundColor="green"
        leftComponent={{icon: 'arrow-back', onPress: () => navigation.navigate('Messages') }}
        centerComponent={{text: name, style: {fontSize: 20, color: 'black'}}}
      />
      <Text>Conversation Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({

});

export default ConversationScreen;