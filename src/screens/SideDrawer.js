import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class SideDrawer extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.drawerItem}>
          <Icon name="ios-log-out" size={30} color="#aaa" />
          <Text style={styles.drawerItemText}>Log Out</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: '#fff'
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#eee'
  },
  drawerItemText: {
    paddingLeft: 10
  }
});

export default SideDrawer;
