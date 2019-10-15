import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import Header from './Header'

const Login = ({
  navigation,
  email, setEmail,
  password, setPassword,
  register, setRegister }) => {

  const authenticateUser = () => {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      const myError = error.code;
      console.log(myError);
    }).then((myError) => {
      if (myError)
        navigation.navigate('Home');
    });
  }

  return (
    <View>
      <Header style={styles.header} title="Login to RuMate"/>
      <TextInput style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="e-mail"
      />
      <TextInput style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="password"
      />
      <TouchableOpacity style={styles.submit} 
        onPress = {authenticateUser} >
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submit}
        onPress={() => {
          setRegister(!register);
        }} >
        <Text>Register</Text>
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

export default Login