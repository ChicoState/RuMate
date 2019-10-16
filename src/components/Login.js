import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  StatusBar 
} from 'react-native';
import firebase from 'firebase';
// import { Header } from 'react-native-elements';
import Header from '../components/Header';
import AuthSpinner from './AuthSpinner';

const Login = ({
  navigation,
  email, setEmail,
  password, setPassword,
  register, setRegister, }) => {
    
  const [waiting, setWaiting] = useState(false);

  const authenticateUser = async () => {
    setWaiting(true)
    await firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
      console.log(error.code, '\n', error.message);
    }).then((myError) => {
      setWaiting(false)
      if (myError) {
        navigation.navigate('Home');
      }
    });
  }

  if (!waiting) {
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
        <TextInput style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="e-mail"
          placeholderTextColor= "#444"
          autoFocus
        />
        <TextInput style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="password"
          placeholderTextColor= "#444"
        />
        <TouchableOpacity style={styles.submit} 
          onPress = {authenticateUser}>
          <Text style={[styles.lightText, styles.button]}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submit}
          onPress={() => {
            setRegister(!register);
          }} >
          <Text style={[styles.lightText, styles.button]}>
            Register
          </Text>
        </TouchableOpacity>
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
    paddingVertical: 10,
    paddingLeft: 5,
    backgroundColor: 'black'
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
  background: {
    flex: 1,
    backgroundColor: '#111111'
  },
});

export default Login