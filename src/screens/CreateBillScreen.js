import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Header, ButtonGroup } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from 'firebase';

const CreateBillScreen = ({navigation}) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [selIndex, setSelIndex] = useState(null);

  var buttons = ["Divide Evenly", "For Each"]

  return (
    <View>
      <Header
        backgroundColor="black"
        leftComponent={<Icon name='arrow-back' size={30} color='white' onPress = { () => navigation.navigate('Bills')} />}
        centerComponent={{text: "Add a bill", style: {fontSize: 20, color: 'white'}}}
      />
      <Text style={styles.label}>Time to be responsible!</Text>
      <TextInput style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Bill Name"
      />
      <TextInput style={styles.input}
        value={value}
        placeholder="Bill Value"
        onChangeText={() => setValue("$ " + value)}
        keyboardType="numeric"
      />
      <TextInput style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="Due date"
        keyboardType=""
      />
      <Text>Method</Text>
      <ButtonGroup
      onPress={setSelIndex}
      buttons={buttons}
      selectedIndex={selIndex}
      />
      <Button title="Submit"
        onPress={() => {
          console.log(selIndex)
          let bill = firebase.database().ref().child('/bills').push();
          bill.set({
            name,
            value,
            date,
            uid: firebase.auth().currentUser.uid,
            billId: firebase.auth().currentUser.uid + value + name + date,
            method: selIndex
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
    alignSelf: 'center',
    marginVertical: '5%',
    paddingVertical: "5%",
    paddingLeft: '1%',
    borderRadius: 5,
    fontSize: 20
  },
  label: {
    fontSize: 30,
    alignSelf: 'center',
    paddingVertical: '10%',

  }
});

export default CreateBillScreen;
