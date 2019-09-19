import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const IndexScreen = () => {
  return (
    <View>
      <Text style={styles.header}>Index</Text>
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