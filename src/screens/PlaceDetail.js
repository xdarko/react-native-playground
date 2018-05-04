import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { deletePlace } from '../store/actions';

class PlaceDetailScreen extends Component {
  static propTypes = {
    place: PropTypes.object.isRequired,
    onDeletePlace: PropTypes.func.isRequired
  };

  handleRemovePlace = () => {
    const { place, onDeletePlace, navigator } = this.props;
    onDeletePlace(place.id);
    navigator.pop();
  };

  render() {
    const { place } = this.props;

    const mapRegion = {
      latitude: place.location.latitude,
      longitude: place.location.longitude,
      latitudeDelta: 0.0122,
      longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
    };

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={place.image} style={styles.image} />
          </View>
          <View style={styles.mapContainer}>
            <MapView initialRegion={mapRegion} style={styles.map}>
              <MapView.Marker coordinate={mapRegion} />
            </MapView>
          </View>

          <Text style={styles.text}>{place.text}</Text>
          
          <View>
            <TouchableOpacity onPress={this.handleRemovePlace}>
              <View style={styles.deleteButton}>
                <Icon name="ios-trash" size={30} color="red" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22
  },
  imageContainer: {
    marginBottom: 20
  },
  image: {
    width: '100%',
    height: 200
  },
  mapContainer: {
    marginBottom: 20
  },
  map: {
    width: '100%',
    height: 240,
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

const mapDispatchToProps = { onDeletePlace: deletePlace };

export default connect(null, mapDispatchToProps)(PlaceDetailScreen);
