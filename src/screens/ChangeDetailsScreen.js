import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase'

const ChangeDetailsScreen = ({ navigation }) => {
  const [changedDetail, setChangedDetail] = useState("")
  const [deleting, setDeleting] = useState(false)
  const [newPass, setNewPass] = useState('')
  const detail = navigation.state.params.detail

  const changeDetail = (detail) => {
    if (detail == 'name') {
      let data = firebase.database().ref('users')
      data.on('value', (snapshot) => {
        let users = snapshot.val()
        for (user in users) {
          if (users[user].uid == firebase.auth().currentUser.uid) {
            firebase.database().ref('users/'+user).update({name: changedDetail})
            navigation.navigate('Home');
          }
        }
      })
    } else if (detail == 'password') {
      let data = firebase.database().ref('users')
      data.on('value', (snapshot) => {
        let users = snapshot.val()
        for (user in users) {
          if (users[user].uid == firebase.auth().currentUser.uid) {
            firebase.auth().currentUser.updatePassword(changedDetail).then(()=>{
              firebase.auth().signOut()
              navigation.navigate('Login')
            })
          }
        }
      })
    }
  }

  const passValidate = () => {
    if (newPass == changedDetail && newPass.length >= 6)
      return true
    return false
  }

  const renderWarning = () => {
    if (!passValidate()) {
      return <Text>Passwords must match!</Text>
    }
  }

  const renderType = () => {
    const username = navigation.state.params.username
    if (detail == 'name') {
      return (<>
        <Text style={styles.mainLabel}>
          {`Time for a new identity, \n`}
          {username + '?'}
        </Text>
        <Text style={styles.inputLabel}>New Display Name</Text>
        <TextInput 
          style={styles.input}
          value={changedDetail}
          onChangeText={setChangedDetail}
        />
        <TouchableOpacity style={styles.submit}
          onPress={() => {
            changeDetail(detail, changedDetail)
          }}
        >
          <Text style={styles.button}>Submit</Text>
        </TouchableOpacity>
      </>)
    } else if (detail == 'password') {
      return (<>
        <Text style={styles.mainLabel}>
          {`Security is important, \n`}
          {username + '!'}
        </Text>
        <Text style={styles.inputLabel}>New password</Text>
        <TextInput 
          style={styles.input}
          value={newPass}
          onChangeText={setNewPass}
        />
        <Text style={styles.inputLabel}>Old password</Text>
        <TextInput 
          style={styles.input}
          value={changedDetail}
          onChangeText={setChangedDetail}
        />
        <TouchableOpacity style={styles.submit}
          onPress={() => {
            if (passValidate(detail)) {
              changeDetail(detail)
              navigation.navigate('Login')
            }
          }}
        >
          {renderWarning()}
          <Text style={styles.button}>Submit</Text>
        </TouchableOpacity>
      </>)
    } else if (detail == 'delete-account') {
      if (!deleting) {
        return (<>
          <Text style={styles.mainLabel}>
            There's no coming back from this, are you sure?
          </Text>
          <TouchableOpacity style={styles.deleteButton}
            onPress={() => setDeleting(true)}
            >
            <Text style={styles.deleteText}>Do it, erase me.</Text>
          </TouchableOpacity>
        </>)
      } else {
        return (<>
          <Text style={styles.mainLabel}>
            Last chance!
          </Text>
          <TouchableOpacity style={styles.deleteButton}
            onPress={() => {
              firebase.auth().signOut().then(() => {
                alert("Account Destroyed")
                navigation.navigate('Login')
              })
            }}
            >
            <Text style={styles.deleteText}>I said do it!</Text>
          </TouchableOpacity>
        </>)
      }
    }
  }

  return (
    <View style={{height: '100%'}}>
      <Header
        backgroundColor="#000"
        leftComponent={<Icon name='arrow-back' size={25} color='white' onPress = { () => navigation.navigate('Home')} />}
        centerComponent={{text: "My Account", style: {fontSize: 20, color: 'white'}}}
      />
      {renderType()}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#222',
    marginVertical: 5,
    width: 300,
    marginHorizontal: 5,
    alignSelf: 'center',
    fontSize: 18,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 15
  },
  button: {
    fontSize: 25,
    paddingTop: 10,
    alignSelf: 'center'
  },
  deleteButton: {
    borderColor:'red',
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    marginHorizontal: '5%',
    backgroundColor: 'white',
  },  
  deleteText: {
    fontSize: 25,
    alignSelf: 'center',
    color: 'red'
  },
  submit: {
    borderColor: '#222',
    borderRadius: 15,
    width: 300,
    alignItems: 'center',
    height: 50,
    marginHorizontal: 5,
    alignSelf: 'center',
    marginVertical: 5
  },
  mainLabel: {
    fontSize: 30,
    paddingVertical: '10%',
    alignSelf: 'center'
  },
  username: {
    alignSelf: 'center'
  },
  inputLabel: {
    alignSelf: 'center'
  }
})

export default ChangeDetailsScreen