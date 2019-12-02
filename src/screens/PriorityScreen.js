import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from 'firebase';


const PriorityScreen = ({navigation}) => {
  const [assignments, setAssignments] = useState([]);

  const getAssignments = () => {
    the_assignments = [];
    var ref = firebase.database().ref('bills');
    ref.on('value', function(snapshot) {
        let data = snapshot.val();
        for (let item in data)
        {
            if (firebase.auth().currentUser.uid == data[item].memberID)
            {
                the_assignments.push(data[item]);
            }
        }
        setAssignments(the_assignments);
    });

    ref = firebase.database().ref('tasks');
    ref.on('value', function(snapshot) {
        let data = snapshot.val();
        for (let item in data)
        {
            if (firebase.auth().currentUser.uid == data[item].memberID)
            {
                the_assignments.push(data[item]);
            }
        }
        setAssignments(the_assignments);
    });
  }

  useEffect(() => {
    getAssignments();
  })

  return (
    <View style={{flex: 1}}>
      <Header
        backgroundColor="#000"
        leftComponent={<Icon name='arrow-back' size={30} color='white' onPress = { () => navigation.navigate('Home')} />}
        centerComponent={{text: "Priority Assignments", style: {fontSize: 20, color: 'white'}}}
        //rightComponent={{icon: 'add-circle', color: 'white', onPress: () => navigation.navigate('CreateTask') }}
        //TODO DL: make a filter functionality to set how long upcoming should be, maybe have a past due and an upcoming section
      />
      {
        assignments.map((l, i) => (
          <ListItem
            onPress={() => openDialog(l.gid)}
            key={i}
            title={l.from}
            rightIcon = {<Icon size={30} color='black' name="error-outline" />}
            bottomDivider
          />
        ))         
      }
    </View>
  );
}

const styles = StyleSheet.create({
  // styles
  button: {
    marginHorizontal: 5,
    alignSelf: 'center',
    marginVertical: 5
  }
});

export default PriorityScreen;
