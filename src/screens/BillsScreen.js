import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BillList from '../components/BillList';

const BillsScreen = () => {
  const [user, setUser] = useState("");
  return (
    <View>
      <Text> My Bills:  </Text>
      <BillList user={() => {}} />
    </View>
  );
}

styles = StyleSheet.create({
  //styles
});

export default BillsScreen;