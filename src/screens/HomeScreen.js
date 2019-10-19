import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Header } from 'react-native-elements';
import Tile from '../components/Tile';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/MaterialIcons'

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <StatusBar barStyle='light-content'/>
      <Header
        backgroundColor="#119"
        centerComponent={{text: "Home", style: {fontSize: 20, color: 'white'}}}
        rightComponent={<Icon size={30} color='white' name="group-add" onPress = {() => navigation.navigate('AddRoommate')} />}
      />
      <Text>Welcome {firebase.auth().currentUser.uid}</Text>
      <Tile 
        title="Messages"
        color="green"
        text="Tap to view messages"
        textColor="white"
        nav={navigation}
        location="Messages"
      />
      <Tile 
        title="Messages2"
        color="green"
        text="Tap to view messages"
        textColor="white"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // styles
  
});

export default HomeScreen;