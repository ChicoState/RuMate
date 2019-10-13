import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Bill = ({ bill }) => {
  const [billNumber, setBillNumber] = useState(0);

  return (
    <View>
      <Text>{name}</Text>
      <Text>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({

});

export default Bill;