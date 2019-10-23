import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Button, TextInput } from 'react-native';
import { Header } from 'react-native-elements';
import MessageList from '../components/MessageList';

const ConversationScreen = ({ navigation }) => {
  const name = navigation.state.params.name;
  const [input, setInput] = useState("");
  const [cleared, setCleared] = useState(true);
  const submitMessage = (event) => {
    if (event.nativeEvent.key === "Enter") {
      setCleared(false);
      alert("Sent")
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <Header
        backgroundColor="green"
        leftComponent={{icon: 'arrow-back', onPress: () => navigation.navigate('Messages') }}
        centerComponent={{text: name, style: {fontSize: 20, color: 'black'}}}
      />
      <MessageList />
      <TextInput style={styles.textInput}
          value={input}
          onChangeText={setInput}
          placeholder="Message"
          multiline
          enablesReturnKeyAutomatically={true}
          onKeyPress={(event) => {
            submitMessage(event);
          }}
          onEndEditing={() => {
            if (!cleared) {
              setInput("")
            }
          }}
      />
      
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderColor: 'black',
    borderTopWidth: 1,
    marginBottom: "25%",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
});

export default ConversationScreen;