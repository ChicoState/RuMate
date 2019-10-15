import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Header from './Header';
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
    <View>
      <Header style={styles.header} title="Register on RuMate"/>
      <Text>Email: </Text>
      <TextInput 
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="e-mail"
      />
      <Text>Password: </Text>
      <TextInput 
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="password"
      />
      <Text>Confirm Password: </Text>
      <TextInput 
        style={styles.input}
        value={confPassword}
        onChangeText={setConfPassword}
        placeholder="confirm"
      />
      {passMatch(password, confPassword)}
      {passLength(password)}
      <TouchableOpacity 
        style={styles.submit}
        onPress={registerUser}
      >
        <Text>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.submit}
        onPress = {() => {
          setRegister(!register)
        }}
      >
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    marginVertical: 2,
    width: 300,
    marginHorizontal: 5,
    alignSelf: 'center'
  },
  submit: {
    marginHorizontal: 5,
    alignSelf: 'center',
    marginVertical: 5
  }
});

export default Register;