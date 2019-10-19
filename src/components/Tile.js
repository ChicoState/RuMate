import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Tile = ({ title, color, text, textColor, location, nav }) => {
  return (
    <TouchableOpacity onPress={() => {nav.navigate(location)}}>
      <View style={[{backgroundColor: color}, styles.wrapper]}>
        <Text style={[styles.wrapper, {color: textColor}]}>{title}</Text>
        <Text style={[styles.wrapper, {color: textColor}]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 5,
    marginVertical: 3,
    height: 100,
    width: "45%"
  }
});

export default Tile;