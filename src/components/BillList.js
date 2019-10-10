import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';


const renderBills = (bills, setBills) => {
  // firebase pull
  <FlatList
    keyExtractor={() => {

    }}
    data={bills}
    renderItem={({item}) => {
      return (
        <View>
          <Text>Test</Text>
          {item.value}
        </View>
      );
    }}
  />
}

const BillList = () => {
  const [bills, setBills] = useState([{name: "bill", value:"100"}]);
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