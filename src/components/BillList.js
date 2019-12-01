import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import Dimensions from 'Dimensions';
import firebase from 'firebase'
import Bill from '../components/Bill';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

const payBill = () => {
  let val = null
  Alert.alert(
    'Remove Bill?',
    'Tap Okay to remove the bill',
    [
      { text: 'Payed', onPress: () => val = true},
      { text: 'Cancel', onPress: () => val = false, style:'cancel'}
    ]
  )
  return val
}

const renderBills = (bills) => {
  const { height } = Dimensions.get('window');
  return (
    <View style={{height}}>
      <FlatList
        keyExtractor={item => item.billId}
        data={bills}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={payBill}>
              <Bill
                name = {item.name}
                value = {item.value}
                due = {item.date}
                payed = {0}
              />
            </TouchableOpacity>
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

const styles = StyleSheet.create({
  plusButton: {
    fontSize: 20
  },
});

export default BillList;