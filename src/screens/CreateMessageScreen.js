import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Header } from 'react-native-elements';


const CreateMessageScreen = ({ navigation }) => {
  const [recipient, setRecipient] = useState("");
  return (
    <>
      <Header
        backgroundColor=""
        leftComponent={{
          icon: 'arrow-back',
          onPress: () => navigation.navigate('Messages')
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
          value={recipient}
          onChangeText={setRecipient}
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


export default CreateMessageScreen;