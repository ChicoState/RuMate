import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Header } from 'react-native-elements';
import firebase from 'firebase';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <StatusBar barStyle='light-content'/>
      <Header
        backgroundColor="#119"
        centerComponent={{text: "Home", style: {fontSize: 20, color: 'white'}}}
        rightComponent={{icon: 'add-circle', onPress: () => navigation.navigate('AddRoommate') }}
      />
      <Text>Welcome {firebase.auth().currentUser.uid}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // styles
  
});

export default HomeScreen;