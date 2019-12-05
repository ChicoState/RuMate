import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert, Vibration } from 'react-native';
import Dimensions from 'Dimensions';
import firebase from 'firebase'
import Bill from '../components/Bill';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';

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



const BillList = () => {
  const [bills, setBills] = useState([]);
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    // firebase pull
    getBills(setBills);
  }, []);
  const renderBills = () => {
    const { height } = Dimensions.get('window');
    return (
      <View style={{height}}>
        <FlatList
          keyExtractor={item => item.billId}
          data={bills}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity 
                onPress={payBill}
                onLongPress={() => {
                  console.log("test")
                  Haptics.selectionAsync()
                  }}>
                <Bill
                  name = {item.name}
                  value = {item.value}
                  due = {item.date}
                  payed = {0}
                  edit = {editing}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
  return (
    <View>
      {renderBills()}
    </View>
  );
}

const styles = StyleSheet.create({
  plusButton: {
    fontSize: 20
  },
});

export default BillList;