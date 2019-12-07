import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, Image, Platform } from 'react-native'
import { Header } from 'react-native-elements'
import firebase from 'firebase'
import Icon from 'react-native-vector-icons/MaterialIcons';
import User from 'react-native-vector-icons/FontAwesome';
import Tile from '../components/Tile'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

const AccountScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState('')
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
    getPhoto()
  }, []);

  const getPhoto = () => {
    let data = firebase.database().ref('/users')
    data.on('value', async (snapshot) => {
      let users = await snapshot.val()
      for (user in users) {
        if (users[user].uid == firebase.auth().currentUser.uid) {
          setPhoto(users[user].photoUri)
        }
      }
    })
  }

  const pickImage = async () => {
    getPermissionsAsync()
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })
    console.log(result)
    if (!result.cancelled) {
      let data = firebase.database().ref('users/')
      data.on('value', (snapshot) => {
        let users = snapshot.val()
        for (user in users) {
          if (users[user].uid == firebase.auth().currentUser.uid) {
            firebase.database().ref('users/' + user).update({
              photoUri: result.uri
            })
            setPhoto(result.uri);
          }
        }
      })
    }
  }

  const getPermissionsAsync = async () => {
    if (Platform.OS == 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status !== 'granted') {
        alert("Grant permissions to upload your photo")
      }
    }
  }

  const renderPhoto = () => {
    console.log(photo)
    if (photo) {
      return (
        <View style={styles.photo}>
          <Image
            style={{ height: 100, width: 100, borderRadius: 50 }}
            source = {{uri: photo}}
          />
        </View>
      )
    } else {
      return (
        <User style = {styles.userLogo}
          name = "user-circle"
          size = {100}
        />
      )
    }
  }

  return (
    <View style={{flex: 1}}>
      <Header
        backgroundColor="#000"
        leftComponent={<Icon name='arrow-back' size={25} color='white' onPress = { () => navigation.navigate('Home')} />}
        centerComponent={{text: "My Account", style: {fontSize: 20, color: 'white'}}}
      />
      <ScrollView style={{height: '100%'}}>
        <Text style={styles.welcomeBanner}>{getDisplayName()}</Text>
        <TouchableOpacity onPress={ () => {
          pickImage()
        }}>
          
          {renderPhoto()}
        </TouchableOpacity>
        {/* <Text style={{paddingBottom: '20%'}}>Change photo</Text> */}
        <Tile style={styles.tile}
          title="Change Display Name"
          color="#111"
          text="Tap to change your display name"
          textColor="white"
          nav={navigation}
          location="ChangeDetails"
          params={{detail: 'name', username: getDisplayName()}}
          run="haptic-select"
        />
        <Tile style={styles.tile}
          title="Change Password"
          color="#111"
          text="Tap to change your password"
          textColor="white"
          nav={navigation}
          location="ChangeDetails"
          params={{detail: 'password', username: getDisplayName()}}
          run="haptic-select"
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
          run="haptic-select"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  userLogo: {
    paddingBottom: '10%',
    alignSelf: 'center'
  },
  photo: {
    alignSelf: 'center',
    marginBottom: '10%',
  },
  welcomeBanner: {
    fontSize: 30,
    alignSelf: 'center',
    paddingTop: '20%',
  }
});

export default AccountScreen;