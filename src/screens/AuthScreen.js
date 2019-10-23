import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text,
  StyleSheet, 
} from 'react-native';
import Register from '../components/Register';
import Login from '../components/Login';
import Dimensions from 'Dimensions';

const AuthScreen = ({navigation}) => {
  const [register, setRegister] = useState(false);
  // set initial email state to empty string
  const [email, setEmail] = useState("MsgAndGrpTest@noyou.com");
  // password string initally empty
  const [password, setPassword] = useState("Test1234");
  const [confPassword, setConfPassword] = useState("");
  // google auth state
  const [signedIn, setSignedIn] = useState(false);
  // google photo?
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    // firebase.auth();
    // setSignedIn() will be used here eventually
    // to check if a user is already logged in
    // when starting up the app. 
  }, []);

  const passMatch = (password, confPassword) => {
    if (password != confPassword) {
      return (
        <>
          <Text style={styles.errorText}>Passwords must match</Text>
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
            <Text style={styles.errorText}>Must be more than 6 characters in length</Text>
          </>
        )
      }
    }
    return (null);
  }
  
  const renderRegister = () => {
    return (
      <Register 
        name = {name}
        setName = {setName}
        email = {email}
        setEmail = {setEmail}
        password = {password}
        setPassword = {setPassword}
        confPassword = {confPassword}
        setConfPassword = {setConfPassword}
        register = {register}
        setRegister = {setRegister}
        passMatch = {passMatch}
        passLength = {passLength}
      />
    );
  }

  const renderLogin = () => {
    return (
      <Login style={styles.background}
        email = {email}
        setEmail = {setEmail}
        password = {password}
        setPassword = {setPassword}
        register = {register}
        setRegister = {setRegister}
        setSignedIn = {setSignedIn}
        navigation = {navigation}
      />
    );
  }

  const renderAuth = () => {
    if (!signedIn) {
      if (register)
        return renderRegister()
      return renderLogin()
    } else {
      return navigation.navigate('Home', {signedIn, setSignedIn});
    }
  }
  
  return renderAuth();
}

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 15,
    alignSelf: 'center'
  },
});

export default AuthScreen;