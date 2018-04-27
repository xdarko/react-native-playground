import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TextHeader = props => (
  <Text style={[styles.textHeader, props.style]}>
    {props.children}
  </Text>
);

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 28,
    fontWeight: 'bold'
  },
}); 

export default TextHeader;
