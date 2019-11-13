import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons';
import User from 'react-native-vector-icons/FontAwesome';

const AccountScreen = ({ navigation }) => {
  return(
    <View style={{flex: 1}}>
      <Header
        backgroundColor="#111"
        leftComponent={<Icon name='arrow-back' size={25} color='white' onPress = { () => navigation.navigate('Home')} />}
        centerComponent={{text: "My Account", style: {fontSize: 20, color: 'white'}}}
      />
      <User style = {styles.userLogo}
        name = "user-circle"
        size = {100}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  userLogo: {
    flex: 2
  }
});

export default AccountScreen;