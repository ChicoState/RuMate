import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { Header } from 'react-native-elements';
import Tile from '../components/Tile';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/MaterialIcons'
import * as Ani from 'react-native-animatable'
import User from 'react-native-vector-icons/FontAwesome';


const getDisplayName = () => {
  let username = firebase.auth().currentUser.email.split("@")[0]
  let capital = username[0].toUpperCase()
  username = username.split(username[0])
  return(capital + username[1])
}


const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.background}>
      <StatusBar barStyle='light-content'/>
      {/* <Ani.View animation="slideInUp" duration={200}> */}
      <Header
        backgroundColor="#000"
        leftComponent={<Icon size={30} color='white' name='person' onPress = {() => navigation.navigate('Invitations')} />}
        centerComponent={{text: "Home", style: {fontSize: 20, color: 'white'}}}
        rightComponent={<Icon size={30} color='white' name="group-add" onPress = {() => navigation.navigate('AddRoommate')} />}
      />
      <ScrollView style={{height: '100%'}}>
        <Ani.View animation="fadeIn" duration={2000}>
          <Text style={styles.welcomeBanner}> 
            {"Welcome " + getDisplayName()}
          </Text>
        
        
          <User style = {styles.userLogo}
            name = "user-circle"
            size = {100}
          />
        </Ani.View>
        <Tile style={styles.tile}
          title="Account"
          color="#111"
          text="Tap to view account details"
          textColor="white"
          nav={navigation}
          location="Account"
        />
      </ScrollView>
      {/* </Ani.View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  // styles
  background: {
    backgroundColor: 'white',
    flex: 1
  },
  userLogo: {
    alignSelf: 'center'
  },  
  tile: {
    alignContent: 'center'
  },
  welcomeBanner: {
    fontSize: 30,
    alignSelf: 'center',
    paddingTop: '20%',
    paddingBottom: '10%'
  }
});

export default HomeScreen;


// {/* <Tile style={styles.tile}
//           title="Messages"
//           color="#111"
//           text="Tap to view messages"
//           textColor="white"
//           nav={navigation}
//           location="Messages"
//         /> */}