import React, { useState } from 'react';
import * as Ani from 'react-native-animatable'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import TitleBlock from './TitleBlock';
import AuthSpinner from './AuthSpinner';
import firebase from 'firebase';
import * as Haptics from 'expo-haptics';

const Register = ({ 
  name, setName,
  email, setEmail,
  password, setPassword,
  confPassword, setConfPassword,
  register, setRegister,
  passMatch, passLength }) => {
  const [waiting, setWaiting] = useState(false)
  
  const registerUser = async () => {
    Haptics.selectionAsync()
    setWaiting(true)
    if (password == confPassword && password.length >= 6) {
      await firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        console.log(error.code, '\n', error.message)
        if (error.message) {
          alert(error.message);
        }
      }).then( async () => {
          alert("Welcome " + email + "!");
          let newUser = await firebase.database().ref().child('/users').push();
          await newUser.set({
            email,
            uid: firebase.auth().currentUser.uid,
            rid: -1,
            name,
            photoUri: ''
          });
          setRegister(!register);
        }
      );
    }
  }
  if (!waiting) {
    return (
      <View style={styles.background}>
        <StatusBar barStyle='light-content'/>
        <Ani.View animation="fadeIn">
        <TitleBlock
          title="RuMate" 
          color="white"
          fontSize={40}
          paddingTop={"20%"}
          paddingBottom={"5%"}
        />
        <Text style={[styles.lightText, styles.label]}>Name</Text>
        <TextInput 
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="name"
          placeholderTextColor= "#444"
        />
        <Text style={[styles.lightText, styles.label]}>Email</Text>
        <TextInput 
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="e-mail"
          placeholderTextColor= "#444"
        />
        <Text style={[styles.lightText, styles.label]}>Password</Text>
        {passLength(password)}
        <TextInput 
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="password"
          placeholderTextColor= "#444"
        />
        <Text style={[styles.lightText, styles.label]}>Confirm Password</Text>
        {passMatch(password, confPassword)}
        <TextInput 
          secureTextEntry
          style={styles.input}
          value={confPassword}
          onChangeText={setConfPassword}
          placeholder="confirm password"
          placeholderTextColor= "#444"

        />
        {/* Go forth and register function here */}
        <TouchableOpacity 
          style={styles.submit}
          onPress={registerUser}
        >
          <Text style={[styles.lightText, styles.button]}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.submit}
          onPress = {() => {
            Haptics.selectionAsync()
            setRegister(!register)
          }}
        >
          <Text style={[styles.lightText, styles.button]}>
            Back
          </Text>
        </TouchableOpacity>
        </Ani.View>
      </View>
    );
  } else {
    return <AuthSpinner />
  }
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#222',
    marginVertical: 5,
    width: 300,
    marginHorizontal: 5,
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: 'black',
    borderRadius: 15
  },
  lightText: {
    color: 'white'
  },
  darkText: {
    color: 'black'
  },
  button: {
    fontSize: 25,
    paddingTop: 10,
  },
  loginButton: {
    backgroundColor: 'green',
  },
  registerButton: {
    backgroundColor: 'black',
  },
  submit: {
    borderColor: '#222',
    borderRadius: 15,
    width: 300,
    alignItems: 'center',
    height: 50,
    marginHorizontal: 5,
    alignSelf: 'center',
    marginVertical: 5
  },
  background: {
    flex: 1,
    backgroundColor: 'rgb(25,25,25)'

  },
  label: {
    alignSelf: 'center',
    fontSize: 15,
  },
});


export default Register;