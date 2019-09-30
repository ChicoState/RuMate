import React,  {Component} from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, Text,} from 'react-native';
import flatlistData from '../components/FlatListData.js'

class FlatListItem extends Component {
    render() {
      return (
        <View style={{
          flex: 1,
          backgroundColor: "#858585",
          borderRadius: 4,
          borderWidth: 0.5,
          borderColor: 'black',
          marginHorizontal: 2,
          marginVertical: 1,
        }}>
          <Text style={styles.FlatListItem}> {this.props.item.name}      Task: {this.props.item.description}</Text>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  flatListItem: {
    color: 'white',
    padding: 10,
    fontSize: 30
  }
});

export default class TaskList extends Component {
render() {
  return (
    <View style={{flex: 1, marginTop: 22}}>
      <FlatList
        data={flatlistData}
        renderItem={({ item, index })=>{
          return (
            <FlatListItem item={item} index={index}>

            </FlatListItem>);
        }}
      >
      </FlatList>
    </View>
  );
}
}
