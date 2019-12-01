import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { Header } from 'react-native-elements';
import Tile from '../components/Tile';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Ani from 'react-native-animatable';
import firebase from 'firebase';

const HomeScreen = ({ navigation }) => {
  const [taskColor, setTaskColor] = useState("#111");
  const [taskText, setTaskText] = useState("You have 0 upcoming or past-due assignments. You're a great RuMate!");
  const [numAsmts, setNumAsts] = useState(0);

  const getTasksAndBills = () => {
    const bills = firebase.database().ref('bills/');
    const tasks = firebase.database().ref('tasks/');

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    const the_date = year + "-" + month + "-" + date;

    bills.on('value', (snapshot) => {
      const data = snapshot.val();
      for (let item in data) {
        if (firebase.auth().currentUser.uid == data[item].uid && data[item].date < the_date)
        {
          setNumAsts(numAsmts + 1);
        }
      }
    });

    tasks.on('value', (snapshot) => {
      const data = snapshot.val();
      for (let item in data) {
        if (firebase.auth().currentUser.uid == data[item].uid && data[item].date < the_date)
        {
          setNumAsts(numAsmts + 1);
        }
      }
    });

    console.log(numAsmts)
    /*if (num_asmts > 0)
    {
      setTaskText("You have " + num_asmts + " current or past-due tasks or bills assigned to you. Click here to complete them.");
      setTaskColor("#ff0000");
    }
    */
  }

  useEffect(() => {
    getTasksAndBills();
    console.log(numAsmts);
  }, []);

  return (
    <View style={styles.background}>
      <StatusBar barStyle='light-content'/>
      <Ani.View animation="slideInUp" duration={500}>
      <Header
        backgroundColor="#119"
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
          location="Tasks"
        />
        <Tile style={styles.tile}
          title="Messages"
          color="#111"
          text="Tap to view messages"
          textColor="white"
          nav={navigation}
          location="Messages"
        />
        <Tile style={styles.tile}
          title="Account"
          color="#111"
          text="Tap to view account details"
          textColor="white"
          nav={navigation}
          location="Account"
        />
      </ScrollView>
      </Ani.View>
    </View>
  );
}

const styles = StyleSheet.create({
  // styles
  background: {
    backgroundColor: 'white'
  },
  tile: {
    alignContent: 'center'
  }
});

export default HomeScreen;