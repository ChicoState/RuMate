import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Message = ({ msg, time, sentToMe }) => {
  if (sentToMe) {
    msgStyle = styles.to;
    msgWrapper = styles.toMsgWrapper
  } else {
    msgStyle = styles.from;
    msgWrapper = styles.fromMsgWrapper
  }

  return (
    <View style={msgWrapper}>
      <Text style={[msgStyle, styles.timeStyle]}>{time}</Text>
      <Text style={msgStyle}>{msg}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  toMsgWrapper: {
    marginRight: 20,
    marginLeft: "40%",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    backgroundColor: 'blue',
    paddingVertical: 10,
  },
  fromMsgWrapper: {
    marginLeft: 20,
    marginRight: '40%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 5,
    backgroundColor: 'green',
    paddingVertical: 10,
  },
  to: {
    color: 'white',
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    fontSize: 15,
  },
  from: {
    color: 'white',
    paddingHorizontal: 10,
    fontSize: 15,
  },
  timeStyle: {
    color: 'white',
    fontSize: 10,
  },
  nameStyle: {
    fontSize: 20,
  }
});

export default Message;