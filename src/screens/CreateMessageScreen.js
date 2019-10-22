import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Header } from 'react-native-elements';
import firebase from 'firebase';
import Conversation from '../components/Conversation';

const CreateMessageScreen = ({ navigation }) => {
  const [recipient, setRecipient] = useState("");
  const [group, setGroup] = useState([]);

  const loadRecipients = (name) => {
    if (recipient) {
      // check if recipient is in rm group
      return (
        <Conversation 
          name = {name}
          blurb ="Eventually first 100 chars of last message
            will go here"
          navigation={navigation}
        />
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <Text style={styles.noName}>Enter a name</Text>
        </View>
      )
    }
  }
  useEffect(() => {
    //firebase.database.ref('/groups')
  }, []);
  return (
    <>
      <Header
        backgroundColor=""
        leftComponent={{
          icon: 'arrow-back',
          onPress: () => navigation.navigate('Messages')
        }}
        centerComponent={{
          text: "New Message",
          style: { fontSize: 20, color: 'black' }
        }}
        rightComponent={{
          icon: 'add-circle',
          onPress: () => navigation.navigate('CreateMessage') 
        }}
      />
      <View style={styles.container}>
        <TextInput style={styles.searchBar}
          value={recipient}
          onChangeText={(text) => {
            setRecipient(text);
          }}
          placeholder="To"
          autoFocus
        />
      </View>
      {loadRecipients(recipient)}
      {/* 
        type a name, list matches, if tapped, take to conversation screen.
        w/ or w/o existing conversation.
      */}
      
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 15,
    fontSize: 20,
  },
  noName: {
    alignSelf: 'center',
    fontSize: 30,
    paddingTop: "30%",
  }
});


export default CreateMessageScreen;