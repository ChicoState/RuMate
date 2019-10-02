import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text,
  StyleSheet, 
  TextInput,
  TouchableOpacity } from 'react-native';
import Expo from 'expo';
import Header from '../components/Header';

const LoginScreen = ({navigation}) => {
  // set initial email state to empty string
  const [email, setEmail] = useState("");
  // password string initally empty
  const [password, setPassword] = useState("");
  // google auth state
  const [signedIn, setSignedIn] = useState(false);
  // google photo?
  const [photo, setPhoto] = useState("");
  useEffect(() => {
    // mongodb init goes here eventually.
  }, []);


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
      <TouchableOpacity onPress={() => {
        // IFF authenticate -> navigate
        navigation.navigate('Main');
      }}>
        <View style={styles.submit}>
          <Text>Submit</Text>
        </View>
      </TouchableOpacity>

      {/* Login w/ google option */}
      <TouchableOpacity style={styles.submit}>
        <Text>Login w/ Google</Text>
       {/* <GoogleAuth /> */}
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.submit}>
        <Text>Login w/ Facebook</Text>
       {/* <GoogleAuth /> */}
      </TouchableOpacity>


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