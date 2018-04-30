import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList } from 'react-native';
import PlaceListItem from './PlaceListItem';

const PlaceList = ({ places, onPlaceSelect }) => (
  <FlatList
    style={styles.listContainer}
    data={places}
    keyExtractor={item => item.id}
    renderItem={({ item: { text, id, image } }) => (
      <PlaceListItem text={text} image={image} onPress={() => onPlaceSelect(id)} />
    )}
  />
);

PlaceList.propTypes = {
  places: PropTypes.array,
  onPlaceSelect: PropTypes.func
};

const styles = StyleSheet.create({
  listContainer: {
    width: '100%'
  }
});

export default PlaceList;
