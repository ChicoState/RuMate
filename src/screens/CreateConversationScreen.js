import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { Header } from 'react-native-elements';
import firebase from 'firebase';
import Conversation from '../components/Conversation';

const CreateConversationScreen = ({ navigation }) => {
  const [recipient, setRecipient] = useState("");
  const [users, setUsers] = useState([]);

  const loadRecipients = () => {
    let response = firebase.database().ref('users');
    response.on("value", (snapshot) => {
      let data = snapshot.val();
      let userList = [];
      for (item in data) {
        if (data[item].uid !== firebase.auth().currentUser.uid)
          userList.push(data[item]); 
      }
      setUsers(userList);
    })
  }

  const renderRecipients = () => {
    render = false
    renderList = []
    uid = 0
    for (user in users) {
      if (users[user].name.includes(recipient)) {
        render = true
        renderList.push([users[user].name, uid])
        uid += 1;
      }
    }
    if (recipient && render) {
      return (
        <FlatList 
          data = {renderList}
          keyExtractor={item => item[1].toString()}
          renderItem = {(item) => {
            console.log(item)
            return(
              <Conversation
                name={item.item[0]}
                blurb=""
                navigation = {navigation}
              />
            )
          }}
        />
      )
    } else {
      return (
        <View style={{flex: 1}}>
          <Text style={styles.noName}>Enter a name</Text>
        </View>
      )
    }
  }

  useEffect(() => {
    loadRecipients()
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
      />
      <View style={styles.container}>
        <TextInput style={styles.searchBar}
          value={recipient}
          onChangeText={(text) => {
            setRecipient(text);
          }}
          placeholder="name search"
          autoFocus
        />
      </View>
      {renderRecipients()}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 30,
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


export default CreateConversationScreen;