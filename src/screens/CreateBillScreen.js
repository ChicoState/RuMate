import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import DatePicker from 'react-native-datepicker';

import { Header, ButtonGroup } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from 'firebase';

const CreateBillScreen = ({navigation}) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [rid, setRID] = useState("");
  const [selIndex, setSelIndex] = useState(-1);

  var buttons = ["Divide Evenly", "For Each"]

  useEffect(() => {
    const uid = firebase.auth().currentUser.uid;
    let ref = firebase.database().ref('users');

    ref.orderByChild("uid").equalTo(uid).once("value", (snapshot) => {
      let data = snapshot.val();
      for (let item in data)
      {
        setRID(data[item].rid);
        ref.orderByChild("rid").equalTo(data[item].rid).once("value", (snapshot) => {
        })
      }
    })
  }, []);

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
        placeholder="Bill Amount"
        onChangeText={setValue}
        keyboardType="numeric"
      />
      {/* Personal bill OR group bill like rent/water/electric */}
      <Text style={styles.inputLabel}>Due by</Text>
      <DatePicker 
        style={styles.DatePickerStyle}
        onDateChange={setDate}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        format="YYYY-MM-DD"
        placeholder="select date"
        date={date}
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
            method: selIndex,
            rid : rid
          });
          navigation.navigate('Bills');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#222',
    marginVertical: 5,
    width: 300,
    marginHorizontal: 5,
    alignSelf: 'center',
    fontSize: 18,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 15
  },
  DatePickerStyle: {
    alignSelf: 'center',
    width: 300,
    paddingBottom: '20%',
    width: 200,
  },
  label: {
    fontSize: 30,
    alignSelf: 'center',
    paddingVertical: '10%',
  },
  inputLabel: {
    fontSize: 18,
    paddingTop: '10%',
    paddingBottom: '5%',
    alignSelf: 'center'
  }
});

export default CreateBillScreen;
