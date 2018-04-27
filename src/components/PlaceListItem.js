import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const PlaceListItem = ({ text, image, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.listItem}>
      <Image style={styles.listItemImage} resizeMode="cover" source={image} />
      <Text>{text}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#eee',
  },
  listItemImage: {
    height: 30,
    width: 30,
    marginRight: 8
  }
});

export default PlaceListItem;