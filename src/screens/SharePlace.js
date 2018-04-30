import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { addPlace } from '../store/actions';
import { TextMain, TextHeader } from '../components/ui';
import PlaceInput from '../components/PlaceInput';
import PickImage from '../components/PickImage';
import PickLocation from '../components/PickLocation';

class SharePlaceScreen extends Component {
  static propTypes = { addPlace: PropTypes.func.isRequired };

  static navigatorStyle = {
    navBarButtonColor: 'orange'
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  state = {
    placeInput: '',
    location: null,
  };

  onNavigatorEvent = e => {
    if (e.type === 'NavBarButtonPress' && e.id === 'sideDrawerToggler') {
      this.props.navigator.toggleDrawer({ side: 'left' });
    }
  };

  handlePlaceInputChange = placeInput => this.setState({ placeInput });

  handleLocationPick = location => {
    this.setState({ location });

  };

  handlePlaceAdd = () => {
    const { placeInput, location } = this.state;
    if (placeInput.trim() && location) {
      this.props.addPlace(placeInput, location);
    } else {
      alert('Please select a place name and location!');
    }
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <TextMain>
            <TextHeader>Share a Place with us!</TextHeader>
          </TextMain>
          
          <PickImage />
          <PickLocation onLocationPick={this.handleLocationPick} />
          <PlaceInput value={this.state.placeInput} onChange={this.handlePlaceInputChange} />

          <View style={styles.buttonContainer}>
            <Button title="Share the Place!" onPress={this.handlePlaceAdd} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  buttonContainer: {
    margin: 8
  }
});

const mapDispatchToProps = { addPlace };

export default connect(null, mapDispatchToProps)(SharePlaceScreen);
