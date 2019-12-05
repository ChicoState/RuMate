import React, { useState } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView
} from 'react-native';
import firebase from 'firebase';
import * as Animatable from 'react-native-animatable';
import * as Haptics from 'expo-haptics'
import TitleBlock from './TitleBlock';
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
      <View 
        style={styles.background}
        >
          <StatusBar barStyle="light-content"/>
          <Animatable.View animation="fadeInDown">
            <TitleBlock 
              title="RuMate" 
              color="white"
              fontSize={40}
              paddingTop={"40%"}
              paddingBottom={"20%"}
            />
            <TextInput style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="e-mail"
              placeholderTextColor= "#444"
              autoFocus={false}
            />
            <TextInput style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholder="password"
              placeholderTextColor= "#444"
            />
          </Animatable.View>
          <Animatable.View 
            style={{paddingTop: 20}}
            animation="fadeInUp">
            <TouchableOpacity style={[styles.submit, styles.loginButton]} 
              onPress = {() => {
                authenticateUser()
                Haptics.selectionAsync()
                }}>
              <Text style={[styles.darkText, styles.button]}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.submit, styles.registerButton]}
              onPress={() => {
                Haptics.selectionAsync();
                setRegister(!register);
              }} >
              <Text style={[styles.lightText, styles.button]}>
                Register
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        
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
});

export default Login