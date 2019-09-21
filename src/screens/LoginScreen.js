import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity } from 'react-native';
import Header from '../components/Header';

const LoginScreen = () => {
  // set initial email state to empty string
  const [email, setEmail] = useState(""); 
  // password string initally empty
  const [password, setPassword] = useState("");
  return (
    <View>
      <Header text="Login to RuMate"/>
      {/* Text input for user's login email */}
      <TextInput style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      {/* Text input for user's login pw */}
      <TextInput style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      {/* custom login button 
        * (don't use <Button /> unless 
        sepcifically wanted) */}
      <TouchableOpacity onPress={ /* function to login */ }>
        <View style={styles.submit}>
          <Text>Submit</Text>
        </View>
      </TouchableOpacity>

      {/* Login w/ google option */}
      <TouchableOpacity>
       {/* <GoogleAuth /> */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // styles
  input: {

  },
  submit: {

  }
});

export default LoginScreen;