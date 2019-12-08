import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert, Vibration } from 'react-native';
import Dimensions from 'Dimensions';
import firebase from 'firebase'
import Bill from '../components/Bill';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';

const getBills = async (setBills) => {
  const bills = await firebase.database().ref('bills/');
  const users = firebase.database().ref("users/");

  users.orderByChild("uid").equalTo(firebase.auth().currentUser.uid).on("value", (snapshot) => {
    let data = snapshot.val();
    let rid = -1;
    for (let item in data)
    {
      rid = data[item].rid;
    }

    users.orderByChild("rid").equalTo(rid).once("value", (snapshot) => {
      let data = snapshot.val();
      let num = 0;
      for (let item in data)
      {
        num = num + 1;
      }

      bills.on('value', (snapshot) => {
        const data = snapshot.val();
        let list = [];
  
        for (let item in data) {
          if (data[item].method != -1 && data[item].rid == rid) //group bill
          {
            if (data[item].method == 0) //divide evenly amonst group
            {
              data[item].value = data[item].value / num;
            }
            list.push(data[item])
          }
          else if (firebase.auth().currentUser.uid == data[item].uid) {
            list.push(data[item])
          }
        }
        setBills(list);
      })
    });
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