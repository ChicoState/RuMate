import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Button } from 'react-native';
import { Header } from 'react-native-elements';
import firebase from 'firebase';
import Conversation from '../components/Conversation';

const RoommateSearch = ( props ) => {
  const [recipient, setRecipient] = useState("");
  const [users, setUsers] = useState([]);

  // const getRID = async () => {
  //   var curID = -1;
  //   const userRef = firebase.database().ref(`users/`);
  //   userRef.orderByChild("uid").equalTo(firebase.auth().currentUser.uid).on("value", snapshot => {
  //     let users = snapshot.val();
  //     for(let item in users){
  //       console.log(users[item].rid)
  //       curID = users[item].rid
  //     }
  //     console.log(curID);
  //     return curID;
  //   });
  // }

  const loadRecipients = () => {
    var curID = -1;
    const userRef = firebase.database().ref(`users/`);
    userRef.orderByChild("uid").equalTo(firebase.auth().currentUser.uid).on("value", snapshot => {
      let users = snapshot.val();
      for(let item in users){
        console.log(users[item].rid)
        curID = users[item].rid
      }
      let response = firebase.database().ref('users');
      response.orderByChild("rid").equalTo(curID).on("value", (snapshot) => {
        let data = snapshot.val();
        let userList = [];
        for (item in data) {
          console.log(data[item])
          userList.push(data[item]);
        }
        setUsers(userList);
      })
    });
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
            return(
              <TouchableOpacity onPress={() =>{
                props.nameHandler(item.item[0]);
                setRecipient(item.item[0]);
              }}>
                <View style={styles.container}>
                  <Text style={styles.name}>{item.item[0]}</Text>
                </View>
                </TouchableOpacity>
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
      <View style={styles.container}>
        <TextInput style={styles.RoommateSearch}
          value={recipient}
          onChangeText={(text) => {
            setRecipient(text);
          }}
          placeholder="Name Search"
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
  RoommateSearch: {
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
  },
  name: {
    fontSize: 18,
    paddingVertical: 5,
  }
});


export default RoommateSearch;
