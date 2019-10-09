import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Header title="Home" />
      <Text>Welcome {}</Text>
      {console.log(navigation.state.params)}
    </View>
  );
}

const styles = StyleSheet.create({
  // styles
  
});

export default HomeScreen;