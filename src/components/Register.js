import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import Header from '../components/Header';
import firebase from 'firebase';

const Register = ({ 
  email, setEmail,
  password, setPassword,
  confPassword, setConfPassword,
  register, setRegister,
  passMatch, passLength }) => {

  const registerUser = () => {
    if (password == confPassword && password.length >= 6) {
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        if (errorMessage) {
          alert(errorMessage);
        }
      }).then(() => {
          setRegister(!register);
          alert("Welcome " + email + "!");
          let newUser = firebase.database().ref().child('/users').push();
          newUser.set({
            email,
            uid: firebase.auth().currentUser.uid,
          });
        }
      );
    }
  }

  return (
    <View style={styles.background}>
      <StatusBar barStyle='light-content'/>
      <Header 
        title="RuMate" 
        color="white"
        fontSize={40}
        paddingTop={100}
        paddingBottom={100}
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
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="password"
        placeholderTextColor= "#444"
      />
      <Text style={[styles.lightText, styles.label]}>Confirm Password</Text>
      {passMatch(password, confPassword)}
      <TextInput 
        style={styles.input}
        value={confPassword}
        onChangeText={setConfPassword}
        placeholder="confirm password"
        placeholderTextColor= "#444"

      />
      
      <TouchableOpacity 
        style={styles.submit}
        onPress={registerUser}
      >
        <Text style={[styles.lightText, styles.button]}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.submit}
        onPress = {() => {
          setRegister(!register)
        }}
      >
        <Text style={[styles.lightText, styles.button]}>
          Back
        </Text>
      </TouchableOpacity>
    </View>
  );
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
    paddingVertical: 10,
    paddingLeft: 5,
    backgroundColor: 'black',
  },
  lightText: {
    color: 'white'
  },
  button: {
    fontSize: 20,
    paddingTop: 10,
  },
  submit: {
    borderWidth: 2,
    borderColor: '#222',
    width: 200,
    alignItems: 'center',
    height: 50,
    marginHorizontal: 5,
    alignSelf: 'center',
    marginVertical: 5
  },
  label: {
    alignSelf: 'center',
    fontSize: 15,
  },
  background: {
    flex: 1,
    backgroundColor: '#111111'
  },
});

export default Register;