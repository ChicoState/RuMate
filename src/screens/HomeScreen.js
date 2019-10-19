import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
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
      <ScrollView style={{height: '100%'}}>
        <Text>Welcome {firebase.auth().currentUser.uid}</Text>
        <Tile style={styles.tile}
          title="Messages"
          color="#111"
          text="Tap to view messages"
          textColor="white"
          nav={navigation}
          location="Messages"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // styles
  tile: {
    alignContent: 'center'
  }
});

export default HomeScreen;