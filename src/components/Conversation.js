import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Conversation = ({ name, blurb, navigation }) => {
  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate('Conversation', {name})
    }}>
      <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.blurb}>{blurb}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingBottom: 10,
    borderColor: '#111',
    borderBottomWidth: 1,
    paddingVertical: 20
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