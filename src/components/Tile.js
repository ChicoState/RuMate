import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import firebase from 'firebase'
import * as Haptic from 'expo-haptics';

const Tile = ({ title, color, text, textColor, location, nav, params, run }) => {
  if (!params) {
    params = {}
  }
  return (
    <TouchableOpacity onPress={() => {
      if (run == 'logout') {
        firebase.auth().signOut()
        Alert("Logged Out")
      } else if (run == 'haptic-select'){
        Haptic.selectionAsync()
      }
      nav.navigate(location, params)
      }}>
      <View style={[{backgroundColor: color, borderColor: color}, styles.wrapper]}>
        <Text style={[styles.title, {color: textColor}]}>{title}</Text>
        <Text style={[{color: textColor}]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    paddingBottom: '5%',
    paddingTop: '2%'
  },
  wrapper: {
    marginHorizontal: 5,
    marginVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    height: 100,
    width: "95%",
    alignSelf: 'center'
  }
});

export default Tile;