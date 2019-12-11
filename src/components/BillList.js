import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert, Text } from 'react-native';
import Dimensions from 'Dimensions';
import firebase from 'firebase'
import Bill from '../components/Bill';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import Icon from 'react-native-vector-icons/FontAwesome'

const BillList = () => {
  const [bills, setBills] = useState([]);
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    getBills(setBills);
  }, []);

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
  
  const payBill = (uid) => {
    let val = null
    Alert.alert(
      'Bill Payed?',
      'Tap Payed to remove the bill',
      [
        { text: 'Payed', onPress: () => {
          val = true
          let data = firebase.database().ref('bills')
          data.on('value', (snapshot)=>{
            let bills = snapshot.val()
            for (bill in bills) {
              if (bills[bill].billId == uid) {
                firebase.database().ref('bills/'+bill).remove();
              }
            }
          });
        }},
        { text: 'Cancel', onPress: () => val = false, style:'cancel'}
      ]
    )
    return val
  }

  const renderBills = () => {
    const { height } = Dimensions.get('window');
    if (bills.length) {
      return (
        <View style={{height}}>
          <FlatList
            keyExtractor={item => item.billId}
            data={bills}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity 
                  onPress={() => {payBill(item.billId)}}
                  onLongPress={() => {
                    setEditing(true)
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
    } else {
      return (
        <View>
          <Text style={{
            fontSize: 40, 
            alignSelf: 'center',
            paddingTop: '30%'
          }}>
            No current bills
          </Text>
        </View>
      )
    }
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