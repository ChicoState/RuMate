import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Bill = ({ name, value, due }) => {
  return (
    <View style={styles.bill}>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.detail}>
        <Text>Amount: ${value}</Text>
        <Text>Due by: {due}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18
  },
  bill: {
    paddingVertical: 20,
    paddingLeft: 10
  },
  detail: {
    paddingLeft: 10
  }
});

export default Bill;