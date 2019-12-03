import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';
import { ListItem } from 'react-native-elements';
import BackIcon from 'react-native-vector-icons/MaterialIcons'


const PriorityScreen = ({navigation}) => {
  const [assignments, setAssignments] = useState([]);

  const getAssignments = () => {
    the_assignments = [];
    var ref = firebase.database().ref('bills');
    ref.on('value', function(snapshot) {
        let data = snapshot.val();
        for (let item in data)
        {
            console.log(data[item].uid)
            if (firebase.auth().currentUser.uid == data[item].uid)
            {
              let object = {
                title: data[item].name + "- $" + data[item].value,
                subtitle: "Due by: " + data[item].date,
                icon: "dollar"
              };
              the_assignments.push(object);
            }
        }
        //setAssignments(the_assignments);
    });

    ref = firebase.database().ref('tasks');
    ref.on('value', function(snapshot) {
        let data = snapshot.val();
        for (let item in data)
        {
            if (firebase.auth().currentUser.uid == data[item].uid)
            {
                let object = {
                  title: data[item].description,
                  subtitle: "Due by: " + data[item].date,
                  icon: "tasks"
                }
                the_assignments.push(object);
            }
        }
        setAssignments(the_assignments);
    });
  }

  useEffect(() => {
    getAssignments();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header
        backgroundColor="#000"
        leftComponent={<BackIcon name='arrow-back' size={30} color='white' onPress = { () => navigation.navigate('Home')} />}
        centerComponent={{text: "Priority Assignments", style: {fontSize: 20, color: 'white'}}}
        //rightComponent={{icon: 'add-circle', color: 'white', onPress: () => navigation.navigate('CreateTask') }}
        //TODO DL: make a filter functionality to set how long upcoming should be, maybe have a past due and an upcoming section
      />
      {
        assignments.map((l, i) => (
          <ListItem
            onPress={() => openDialog(l.gid)}
            key={i}
            title={l.title}
            subtitle={l.subtitle}
            rightIcon = {<Icon size={30} color='black' name={l.icon} />}
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
