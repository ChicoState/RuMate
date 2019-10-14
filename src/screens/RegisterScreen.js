import React from 'react';
import { View, Text, TextInput } from 'react-native';
import firebase from 'firebase'

const RegisterScreen = ({ email, password, confPassword, navigation }) => {
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
          navigation.navigate('Login')
        }}
      >
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

export default RegisterScreen;