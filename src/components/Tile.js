import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Tile = ({ title, color, text, textColor, location, nav }) => {
  return (
    <TouchableOpacity onPress={() => {nav.navigate(location)}}>
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