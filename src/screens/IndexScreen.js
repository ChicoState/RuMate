import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
const IndexScreen = () => {
  return (
    <View>
      <Header title="Index" />
    </View>
  );
}

const styles = StyleSheet.create({
  // styles
  header: {
    paddingVertical: 50,
    fontSize: 20
  }
});

export default IndexScreen;