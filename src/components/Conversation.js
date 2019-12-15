import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Haptics from 'expo-haptics';

const Conversation = ({ name, blurb, navigation }) => {
  const [render, setRender] = useState(true)
  if (render) {
    return (
      <TouchableOpacity 
        onPress={() => {
          Haptics.selectionAsync();
          navigation.navigate('Conversation', {name})
        }}
        onLongPress={() => {
          Haptics.impactAsync()
          Alert.alert(
            'Delete messages?',
            'Tap delete to remove the conversation',
            [
              { text: 'Delete', onPress: () => {
                setRender(false)
              }},
              { text: 'Cancel', onPress: () => val = false, style:'cancel'}
            ]
          )
        }}
      >
        <View style={styles.container}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.blurb}>{blurb}</Text>
        </View>
      </TouchableOpacity>
    );
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingBottom: 10,
    borderColor: '#111',
    borderBottomWidth: 1,
    paddingVertical: 20
  },
  name: {
    fontSize: 18,
    paddingVertical: 5,
  },
  blurb: {
    fontSize: 10,
    paddingLeft: 15,
  }
});

export default Conversation;