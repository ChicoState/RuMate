import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TitleBlock = ({title, color, fontSize, paddingTop, paddingBottom}) => {
  return (
    <View>
      <Text 
        style={[styles.header, {
          color, 
          fontSize,
          paddingTop,
          paddingBottom
        }]}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center'
  },
});

export default TitleBlock;