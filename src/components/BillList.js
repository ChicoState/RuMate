import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Bill from '../components/Bill';

const renderBills = () => {

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