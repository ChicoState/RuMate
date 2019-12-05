import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Bill = ({ name, value, due, payed, edit }) => {
  if (payed) {
    payed = styles.payed
  } else {
    payed = styles.neutral
  }
  if (!edit) {
    return (
      <View style={[styles.bill, payed]}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.detail}>
          <Text>Amount: ${value}</Text>
          <Text>Due by: {due}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={[styles.bill, payed]}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.detail}>
          <Text>Amount: ${value}</Text>
          <Text>Due by: {due}</Text>
          <Text>Editing</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  neutral: {
    backgroundColor: 'white'
  },
  payed: {
    backgroundColor: 'green'
  },
  title: {
    fontSize: 18
  },
  bill: {
    paddingVertical: 20,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  detail: {
    paddingLeft: 10
  }
});

export default Bill;