import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text,
  StyleSheet, 
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import * as AppAuth from 'expo-app-auth';
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
    getCachedAuthAsync();
  }, []);

  /**
   * All of these functions down to
   * isSignedIn were pulled form AppAuth
   * Documentation here: 
   *  https://docs.expo.io/versions/v35.0.0/sdk/app-auth/
   * Refer to that link to get an understanding of
   * what the heck is going on. 
   */
  const authConfig = {
    issuer: 'https://accounts.google.com',
    clientId: "484837108351-tvqgaavu2jdsojkn7ouv1tpsoqlti1iv.apps.googleusercontent.com",
    scopes: ['email', 'profile', 'openid'],
  }
  
  const StorageKey = '@RuMate:GoogleOAuthKey';

  const signInAsync = async () => {
    const authState = await AppAuth.authAsync(authConfig);
    await cacheAuthAsync(authState);
    console.log('signInAsync', authState);
    setSignedIn(true);
    return authState;
  }
  
  const cacheAuthAsync = authState => {
    return AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
  }

  const getCachedAuthAsync = async () => {
    const value = await AsyncStorage.getItem(StorageKey);
    const authState = JSON.parse(value);
    console.log('getCachedAuthAsync', authState);
    if (authState) {
      if (tokenExpired(authState)) {
        return refreshAuthAsync(authState);
      } else {
        return authState;
      }
    }
    return null;
  }

  const tokenExpired = ({ accessTokenExpirationDate }) => {
    return new Date(accessTokenExpirationDate) < new Date();
  }

  const refreshAuthAsync = async refreshToken => {
    const authState = await AppAuth.refreshAsync(authConfig, refreshToken);
    console.log('refreshAuthAsync', authState);
    await cacheAuthAsync(authState);
    return authState;
  }

  const singOutAsync = async ({ accessToken }) => {
    try {
      await AppAuth.revokeAsync(authConfig, {
        token: accessToken,
        isClientIdProvided: true,
      });
      await AsyncStorage.removeItem(StorageKey);
      setSignedIn(false);
      return null;
    } catch ({ message }) {
      alert(`Failed to sign out: ${message}`);
    }
  }

  const isSignedIn = () => {
    if (!signedIn) {
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
            onPress={() => {
              navigation.navigate('Main');
            }}
          >
            <Text>Submit</Text>
          </TouchableOpacity>
    
          {/* Login w/ google option */}
          <TouchableOpacity style={styles.submit}
            onPress={() => {
              // sing in
              signInAsync();
            }}
          >
            <Text>Login w/ Google</Text>
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