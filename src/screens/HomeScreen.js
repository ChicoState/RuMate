import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import firebase from 'firebase';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Header title="Home" />
      <Text>Welcome {firebase.auth().currentUser.uid}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // styles
  
});

export default HomeScreen;