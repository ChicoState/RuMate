import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import Header from '../components/Header';
import firebase from 'firebase';

const CreateBillScreen = () => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
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
      <Text>Due by</Text>
      <TextInput style={styles.input}
        value={date}
        onChangeText={setDate}
      />
      <Button title="Submit"
        onPress={() => {
          let bill = firebase.database().ref().child('/bills').push();
          bill.set({
            name,
            value,
            date,
            uid: firebase.auth().currentUser.uid,
            billId: firebase.auth().currentUser.uid + value + name + date
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