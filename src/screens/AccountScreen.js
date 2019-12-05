import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native'
import { Header } from 'react-native-elements'
import firebase from 'firebase'
import Icon from 'react-native-vector-icons/MaterialIcons';
import User from 'react-native-vector-icons/FontAwesome';
import Tile from '../components/Tile'
// import PhotoUpload from 'react-native-photo-upload'

const AccountScreen = ({ navigation }) => {

  const getDisplayName = () => {
    let names = firebase.database().ref('users')
    let name = ""
    names.on("value", (snapshot) => {
      let data = snapshot.val();
      for (i in data) {
        if (data[i].uid == firebase.auth().currentUser.uid)
          name = data[i].name
      }
    });
    return name;
  }
  useEffect(() => {
    // getDisplayName();
  }, []);
  return(
    <View style={{flex: 1}}>
      <Header
        backgroundColor="#000"
        leftComponent={<Icon name='arrow-back' size={25} color='white' onPress = { () => navigation.navigate('Home')} />}
        centerComponent={{text: "My Account", style: {fontSize: 20, color: 'white'}}}
      />
      <ScrollView style={{height: '100%'}}>
        <Text style={styles.welcomeBanner}>{getDisplayName()}</Text>
        
        <User style = {styles.userLogo}
          name = "user-circle"
          size = {100}
        />
        {/* <Text style={{paddingBottom: '20%'}}>Change photo</Text> */}
        <Tile style={styles.tile}
          title="Change Display Name"
          color="#111"
          text="Tap to change your display name"
          textColor="white"
          nav={navigation}
          location="ChangeDetails"
          params={{detail: 'name', username: getDisplayName()}}
        />
        <Tile style={styles.tile}
          title="Change Password"
          color="#111"
          text="Tap to change your password"
          textColor="white"
          nav={navigation}
          location="ChangeDetails"
          params={{detail: 'password', username: getDisplayName()}}
        />
        <Tile style={styles.tile}
          title="Sign Out"
          color="#111"
          text="Tap to log out of RuMate"
          textColor="white"
          nav={navigation}
          location="Login"
          params={{detail: 'password', username: getDisplayName()}}
          run="logout"
        />
        <Tile style={styles.tile}
          title="Delete Account"
          color="#111"
          text="This permanently deletes your account!"
          textColor="red"
          nav={navigation}
          location="ChangeDetails"
          params={{detail: 'delete-account', username: getDisplayName()}}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  userLogo: {
    paddingTop: '10%',
    alignSelf: 'center'
  },
  welcomeBanner: {
    fontSize: 30,
    alignSelf: 'center',
    paddingTop: '20%',
  }
});

export default AccountScreen;