import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({title}) => {
  return (
    <View>
      <Text style={styles.header}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 50,
    fontSize: 20,
    alignSelf: 'center'
  }
});

export default Header;