import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Message from '../components/Message';

const Conversation = ({ name, blurb }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.blurb}>{blurb}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingBottom: 10,
    borderColor: '#111',
    borderBottomWidth: 1,
  },
  name: {
    fontSize: 18,
    paddingVertical: 5,
  },
  blurb: {
    fontSize: 10,
    paddingLeft: 15,
  }
});

export default Conversation;