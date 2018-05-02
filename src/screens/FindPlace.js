import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';
import { getPlaces } from '../store/actions';
import PlaceList from '../components/PlaceList';

class FindPlaceScreen extends Component {
  static propTypes = {
    places: PropTypes.array.isRequired,
    getPlaces: PropTypes.func.isRequired
  };

  static navigatorStyle = {
    navBarButtonColor: 'orange'
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  componentDidMount() {
    this.props.getPlaces();
  }

  state = {
    placesLoaded: false,
    searchAnimation: new Animated.Value(1),
    placesAnimation: new Animated.Value(0)
  };

  onNavigatorEvent = e => {
    if (e.type === 'NavBarButtonPress' && e.id === 'sideDrawerToggler') {
      this.props.navigator.toggleDrawer({ side: 'left' });
    }
  };

  handlePlaceSelect = placeId => {
    const selectedPlace = this.props.places.find(place => place.id === placeId);

    if (selectedPlace) {
      this.props.navigator.push({
        screen: 'awesome-places.PlaceDetailScreen',
        title: selectedPlace.text,
        passProps: { place: selectedPlace }
      });
    }
  };

  runAnimation = () => {
    Animated.timing(this.state.searchAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState({ placesLoaded: true });

      Animated.timing(this.state.placesAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start();
    });
  }

  handlePlacesSearch = () => {
    this.runAnimation();
  };

  render() {
    const { placesLoaded } = this.state;

    let content = (
      <Animated.View
        style={{
          opacity: this.state.searchAnimation,
          transform: [{
            scale: this.state.searchAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [12, 1]
            })
          }]
        }}
      >
        <TouchableOpacity onPress={this.handlePlacesSearch}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Find places</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );

    if (placesLoaded) {
      content = (
        <Animated.View style={{ opacity: this.state.placesAnimation }}>
          <PlaceList places={this.props.places} onPlaceSelect={this.handlePlaceSelect} />
        </Animated.View>
      );
    }

    return (
      <View style={placesLoaded ? null : styles.searchContainer}>{content}</View>
    );
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchButton: {
    borderColor: 'orange',
    borderWidth: 3,
    borderRadius: 50,
    padding: 20
  },
  searchButtonText: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 26
  }
});

const mapStateToProps = ({ places: { places } }) => ({ places });
const mapDispatchToProps = { getPlaces };

export default connect(mapStateToProps, mapDispatchToProps)(FindPlaceScreen);
