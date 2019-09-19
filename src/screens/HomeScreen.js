import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View>
      <Text style={styles.header}>Home</Text>
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

export default HomeScreen;