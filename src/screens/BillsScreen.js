import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BillList from '../components/BillList';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../components/Header';

const renderAddBill = () => {
  return (
    <View>
      <TouchableOpacity 
        onPress={() => {
          // navigation.navigate('CreateBill')
        }}
      >
        <Text>Add Bill</Text>
      </TouchableOpacity>
    </View>
  );
}

const BillsScreen = () => {
  const [user, setUser] = useState("");
  return (
    <View>
      <Header title="Bills" />
      <Text> My Bills: </Text>
      {renderAddBill()}
      <BillList user={() => {}} />
    </View>
  );
}

styles = StyleSheet.create({
  //styles
});

export default BillsScreen;