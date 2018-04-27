import React from 'react';
import { Text, StyleSheet } from 'react-native';

/**
 * This is a styling wrapper around text components.
 * Usage example:
 *  <TextMain>
 *   <Text>Some text here</Text>
 *  </TextMain>
 */
const TextMain = props => (
  <Text style={styles.textMain}>
    {props.children}
  </Text>
);

const styles = StyleSheet.create({
  textMain: {
    color: '#212121',
    backgroundColor: 'transparent'
  }
});

export default TextMain;
