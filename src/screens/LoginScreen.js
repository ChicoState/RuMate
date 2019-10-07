import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text,
  StyleSheet, 
  TextInput,
  TouchableOpacity,
} from 'react-native';
import * as firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

import Header from '../components/Header';

const passMatch = () => {
  if (password != confPassword) {
    return (
      <>
        <Text>Passwords must match!</Text>
      </>
    )
  }
  return (<></>);
}


const LoginScreen = ({navigation}) => {
  const [register, setRegister] = useState(false);
  // set initial email state to empty string
  const [email, setEmail] = useState("");
  // password string initally empty
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  // google auth state
  const [signedIn, setSignedIn] = useState(false);
  // google photo?
  const [photo, setPhoto] = useState("");
  useEffect(() => {
    firebase.auth();
  }, []);
  const isSignedIn = () => {
    if (!signedIn) {
      if (register) {
        
        return (
          <View>
            <Header style={styles.header} title="Register on RuMate"/>
            <Text>Email: </Text>
            <TextInput style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="e-mail"
            />
  
            <Text>Password: </Text>
            <TextInput style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="password"
            />
  
            <Text>Confirm Password: </Text>
            <TextInput style={styles.input}
              value={confPassword}
              onChangeText={setConfPassword}
              placeholder="confirm"
            />
            {passMatch()}
            <TouchableOpacity style={styles.submit}
              onPress={() => {
                if (password == confPassword) {
                  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...
                  });
                }
              }}
            >
            <Text>Submit</Text>
          </TouchableOpacity>
          </View>
        );
      }
      return (
        <View>
          <Header style={styles.header} title="Login to RuMate"/>
          {/* Text input for user's login email */}
          <TextInput style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="e-mail"
          />
          {/* Text input for user's login pw */}
          <TextInput style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="password"
          />
          {/* custom login button 
            * (don't use <Button /> unless 
            sepcifically wanted) */}
          <TouchableOpacity style={styles.submit} 
            onPress = {  () => {
              firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                // const error = await response.json();
                const myError = error.code;
                console.log(myError);
                // ...
              }).then((myError) => {
                if (myError)
                  setSignedIn(true);
              });
            }}
          >
            <Text>Submit</Text>
          </TouchableOpacity>
    
          {/* Login w/ google option */}
          {/* <TouchableOpacity style={styles.submit}
            onPress={() => {
              // sign in
              console.log("running")
              const provider = new firebase.auth.GoogleAuthProvider();
              firebase.auth().signInWithPopup(provider)
            }}
          >
            <Text>Login w/ Google</Text>
          </TouchableOpacity> */}
          
          <TouchableOpacity style={styles.submit}
            onPress={() => {
              //register
              setRegister(!register);
            }}
          >
            <Text>Register</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      navigation.navigate('Main');
    }
  }
  
  return (
    <View>
      {isSignedIn()}
    </View>
  );
  
}

const styles = StyleSheet.create({
  // styles
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

export default LoginScreen;