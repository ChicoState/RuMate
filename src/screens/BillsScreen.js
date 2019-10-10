import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BillList from '../components/BillList';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Header} from 'react-native-elements';

const renderAddBill = (navigation) => {
  return (
    <View>
      <Header
        centerComponent={{text: "Bills", style: {fontSize: 20}}}
        rightComponent={{icon: 'add-circle', onPress: () => navigation.navigate('CreateBill') }}
      />
    </View>
  );
}

const BillsScreen = ({navigation}) => {
  const [user, setUser] = useState("");
  return (
    <View>
      {renderAddBill(navigation)}
      <Text> My Bills: </Text>
      <BillList />
    </View>
  );
}

styles = StyleSheet.create({
  //styles
});

export default BillsScreen;