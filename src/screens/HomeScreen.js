import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { Header } from 'react-native-elements';
import Tile from '../components/Tile';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Ani from 'react-native-animatable';
import firebase from 'firebase';
import User from 'react-native-vector-icons/FontAwesome';

const getDisplayName = () => {
  let username = firebase.auth().currentUser.email.split("@")[0]
  let capital = username[0].toUpperCase()
  username = username.split(username[0])
  return(capital + username[1])
}

const HomeScreen = ({ navigation }) => {
  const [taskColor, setTaskColor] = useState("#111");
  const [taskText, setTaskText] = useState("");

  const setTextAndColor = (numAsmts) => {
    if (numAsmts > 0)
    {
      setTaskText("You have " + numAsmts + " current or past-due tasks or bills assigned to you. Click here to complete them.");
      setTaskColor("#ff0000");
    }
    else
    {
      setTaskText("You have 0 upcoming or past-due assignments. You're a great RuMate!");
    }
  }

  const getTasksAndBills = () => {
    const bills = firebase.database().ref('bills/');
    const tasks = firebase.database().ref('tasks/');

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    const the_date = year + "-" + month + "-" + date;

    var num_asmts = 0;

    bills.on('value', (snapshot) => {
      const data = snapshot.val();
      for (let item in data) {
        if (firebase.auth().currentUser.uid == data[item].uid && data[item].date < the_date)
        {
          num_asmts = num_asmts + 1;
        }
      }
    });

    tasks.on('value', (snapshot) => {
      const data = snapshot.val();
      for (let item in data) {
        if (firebase.auth().currentUser.uid == data[item].uid && data[item].date < the_date)
        {
          num_asmts = num_asmts + 1;
        }
      }
      setTextAndColor(num_asmts);
    });
  }

  useEffect(() => {
    getTasksAndBills();
  }, []);

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
        <Tile style={styles.tile}
          title="Deadlines"
          color={taskColor}
          text={taskText}
          textColor="white"
          nav={navigation}
          location="Priority"
        />
        <Tile style={styles.tile}
          title="Messages"
          color="#111"
          text="Tap to view messages"
          textColor="white"
          nav={navigation}
          location="Messages"
        />
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
    alignSelf: 'center',
    paddingBottom: '10%'
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