import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Dimensions from 'Dimensions';
import firebase from 'firebase'
import Bill from '../components/Bill';

const getBills = async (setBills) => {
  const bills = await firebase.database().ref('bills/');
  bills.on('value', (snapshot) => {
    const data = snapshot.val();
    let list = [];
    for (let item in data) {
      if (firebase.auth().currentUser.uid == data[item].uid) {
        console.log("found one")
        list.push(data[item])
      }
    }
    setBills(list);
  })
}

const renderBills = (bills) => {
  const { height } = Dimensions.get('window');
  return (
    <View style={{height: height}}>
      <FlatList
        keyExtractor={item => item.billId}
        data={bills}
        renderItem={({ item }) => {
          return (
            <Bill
              name = {item.name}
              value = {item.value}
              due = {item.date}
            />
          );
        }}
      />
    </View>
  );
}

const BillList = () => {
  const [bills, setBills] = useState([]);
  
  useEffect(() => {
    // firebase pull
    getBills(setBills);
  }, []);
  return (
    <View>
      {renderBills(bills)}
    </View>
  );
}

styles = StyleSheet.create({
  plusButton: {
    fontSize: 20
  },
});

export default BillList;