import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BillList from '../components/BillList';
import { Header } from 'react-native-elements';
import * as Haptics from 'expo-haptics';

const BillsScreen = ({navigation}) => {
  useEffect(() => {
    Haptics.selectionAsync();
    navigation.addListener('willFocus', () =>{
      Haptics.selectionAsync();
    });
  }, []);

  return (
    <View>
      <Header
        backgroundColor="#000"
        centerComponent={{text: "Bills", style: {fontSize: 20, color: 'white'}}}
        rightComponent={{icon: 'add-circle', onPress: () => navigation.navigate('CreateBill'), color: 'white' }}
      />
      <BillList />
    </View>
  );
}

styles = StyleSheet.create({
  //styles
});

export default BillsScreen;