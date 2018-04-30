import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Button, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

class PickLocation extends Component {
  static propTypes = { onLocationPick: PropTypes.func };
  static defaultProps = { onLocationPick: null };

  state = {
    mapRegion: {
      latitude: 37.7900352,
      longitude: -122.4013726,
      latitudeDelta: 0.0122,
      longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
    },
    isLocationSelected: false
  };

  pickLocation = e => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.mapRegion, latitude, longitude
    });
    this.setState({
      mapRegion: { ...this.state.mapRegion, latitude, longitude },
      isLocationSelected: true
    });
    this.props.onLocationPick && this.props.onLocationPick({ latitude, longitude });
  };

  locateUser = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { coords: { latitude, longitude } } = position;
      const mockLocationEvent = {
        nativeEvent: {
          coordinate: { latitude, longitude }
        }
      };
      this.pickLocation(mockLocationEvent);
    }, error => {
      console.log(error);
      alert('Fetching the position failed, please pick one manually!');
    });
  };

  render() {
    const marker = this.state.isLocationSelected  && (
      <MapView.Marker coordinate={this.state.mapRegion} />
    );

    return (
      <View style={styles.container}>
        <MapView
          ref={ref => this.map = ref}
          initialRegion={this.state.mapRegion}
          style={styles.map}
          onPress={this.pickLocation}
        >
          {marker}
        </MapView>
        <View style={styles.buttonContainer}>
          <Button title="Locate me" onPress={this.locateUser} />
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
  map: {
    width: '100%',
    height: 240
  },
  buttonContainer: {
    margin: 8
  }
});

export default PickLocation;
