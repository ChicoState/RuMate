import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Header } from 'react-native-elements';


const MessageScreen = ({ navigation }) => {
  return (
    <>
      <Header
        backgroundColor=""
        leftComponent={{
          icon: 'arrow-back',
          onPress: () => navigation.navigate('Home')
        }}
        centerComponent={{
          text: "New Message",
          style: { fontSize: 20, color: 'black' }
        }}
        rightComponent={{
          icon: 'add-circle',
          onPress: () => navigation.navigate('CreateMessage') 
        }}
      />
      <View style={styles.container}>
        <TextInput style={styles.searchBar}
          placeholder="To"
          autoFocus
        />
        <Text>Eventually list members of roommate group here</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 15,
    fontSize: 20,

  }
});


export default MessageScreen;