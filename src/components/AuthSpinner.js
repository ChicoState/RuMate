import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Header from './Header';

const Spinner = () => {
  return (
    <View style={styles.background}>
      <Header 
        title="RuMate" 
        color="white"
        fontSize={40}
        paddingTop={100}
        paddingBottom={100}
      />
      <Text style={[styles.lightText, styles.label]}>
        Just a sec, workin' on it ...
      </Text>
      <ActivityIndicator
        style = {styles.spinner}
        size = {0}
        color = "#ccc"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  spinner: {
    paddingVertical: 50,
    alignContent: 'center'
  },
  lightText: {
    color: 'white'
  },
  label: {
    alignSelf: 'center',
    fontSize: 15,
  },
  background: {
    flex: 1,
    backgroundColor: '#111'
  }
});

export default Spinner;