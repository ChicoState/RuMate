import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Bill = () => {
  const [billNumber, setBillNumber] = useState(0);

  return (
    <View>
      <Text> Bill { billNumber }</Text>
    </View>
  );
}

const styles = StyleSheet.create({

});

export default Bill;