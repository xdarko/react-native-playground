import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { removePlace } from '../store/actions';

class PlaceDetailScreen extends Component {
  static propTypes = {
    place: PropTypes.object.isRequired,
    onRemovePlace: PropTypes.func.isRequired
  };

  handleRemovePlace = () => {
    const { place, onRemovePlace, navigator } = this.props;
    onRemovePlace(place.id);
    navigator.pop();
  };

  render() {
    const { place } = this.props;

    return (
      <View style={styles.container}>
        <View>
          <Image source={place.image} style={styles.image} />
          <Text style={styles.text}>{place.text}</Text>
        </View>
        
        <View>
          <TouchableOpacity onPress={this.handleRemovePlace}>
            <View style={styles.deleteButton}>
              <Icon name="ios-trash" size={30} color="red" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22
  },
  image: {
    width: '100%',
    height: 200
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28
  },
  deleteButton: {
    alignItems: 'center',
  }
});

const mapDispatchToProps = { onRemovePlace: removePlace };

export default connect(null, mapDispatchToProps)(PlaceDetailScreen);
