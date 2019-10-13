import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import firebase from 'firebase'
import Bill from '../components/Bill';

const getBills = async (setBills) => {
  const bills = await firebase.database().ref('bills/');
  bills.on('value', (snapshot) => {
    const data = snapshot.val();
    let list = [];
    for (let item in data) {
      if (firebase.auth().currentUser.uid == data[item].uid) {
        list.push(data[item])
      }
    }
    setBills(list);
  })
}

const renderBill = (bills, item) => {
  for (let bill in bills) {
    <Text>
      <Bill 
        name = {bills[bill].name} 
        value = {bills[bill].value}  
      />
    </Text>
  }
}

const renderBills = (bills, setBills) => {
  // firebase pull
  useEffect(() => {
    getBills(setBills);
  }, []);
  console.log(bills);
  <FlatList
    keyExtractor={item => item.uid}
    data={bills}
    renderItem={({item}) => {
      return (
        renderBill(bills, item)
      );
    }}
  />
}

const BillList = () => {
  const [bills, setBills] = useState([]);
  return (
    <View>
      {renderBills(bills, setBills)}
    </View>
  );
}

styles = StyleSheet.create({
  plusButton: {
    fontSize: 20
  }
});

export default BillList;