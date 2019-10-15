import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BillList from '../components/BillList';
import { Header } from 'react-native-elements';

const renderBillHeader = (navigation) => {
  return (
    <View>
      <Header
        backgroundColor="green"
        centerComponent={{text: "Bills", style: {fontSize: 20, color: 'black'}}}
        rightComponent={{icon: 'add-circle', onPress: () => navigation.navigate('CreateBill') }}
      />
    </View>
  );
}

const BillsScreen = ({navigation}) => {
  return (
    <View>
      {renderBillHeader(navigation)}
      <Text> My Bills: </Text>
      <BillList />
    </View>
  );
}

styles = StyleSheet.create({
  //styles
});

export default BillsScreen;