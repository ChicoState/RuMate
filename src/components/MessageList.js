import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Message from '../components/Message';
import { ScrollView } from 'react-native-gesture-handler';

const MessageList = () => {
  return (
    <ScrollView style={styles.container}> 
    {/*Change to flatlist */}
      <Message
        name="test"
        msg="test message"
        time="100"
        to={false}
      />
      <Message
        name="test"
        msg="test message"
        time="100"
        to={true}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "70%"
  }
});

export default MessageList;