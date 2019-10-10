import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import Header from '../components/Header';
import firebase from 'firebase';

const CreateBillScreen = () => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  return (
    <View>
      <Header title="Add a bill"/>
      <Text>Name</Text>
      <TextInput style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text>Value</Text>
      <TextInput style={styles.input}
        value={value}
        onChangeText={setValue}
      />
      <Button title="Submit"
        onPress={() => {
          let bill = firebase.database().ref().child('/bills').push();
          bill.set({
            name: name,
            value: value,
            uid: firebase.auth().currentUser.uid,
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    marginVertical: 2,
    width: 300,
    marginHorizontal: 5,
    alignSelf: 'center'
  },
});

export default CreateBillScreen;