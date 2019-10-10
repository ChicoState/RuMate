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

const passMatch = (password, confPassword) => {
  if (password != confPassword) {
    return (
      <>
        <Text>Passwords must match!</Text>
      </>
    )
  }
  return (null);
}

const passLength = (password) => {
  if (password) {
    if (password.length < 6) {
      return (
        <>
          <Text>Password must be more than 6 characters!</Text>
        </>
      )
    }
  }
  return (null);
}

const LoginScreen = ({navigation}) => {
  const [register, setRegister] = useState(false);
  // set initial email state to empty string
  const [email, setEmail] = useState("Test@noyou.com");
  // password string initally empty
  const [password, setPassword] = useState("Test1234");
  const [confPassword, setConfPassword] = useState("Test1234");
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
            {passMatch(password, confPassword)}
            {passLength(password)}
            <TouchableOpacity style={styles.submit}
              onPress={() => {
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
              }}
            >
              <Text>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submit}
              onPress = {() => {
                setRegister(!register);
              }}
            >
              <Text>Back</Text>
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
          {/* custom login button */}
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
      navigation.navigate('Home', {email, signedIn});
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