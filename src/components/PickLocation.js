import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

class PickLocation extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Text>Map</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Locate me" onPress={() => console.log('Pressed!')} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#eee',
    width: '80%',
    height: 120
  },
  buttonContainer: {
    margin: 8
  }
});

export default PickLocation;
