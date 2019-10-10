import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const renderBills = () => {
  // firebase pull
}

const BillList = () => {
  return (
    <View>
      {renderBills()}
    </View>
  );
}

styles = StyleSheet.create({
  plusButton: {
    fontSize: 20
  }
});

export default BillList;