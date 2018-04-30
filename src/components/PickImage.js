import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Button, StyleSheet } from 'react-native';
import imagePlaceholder from '../assets/background.jpg';
import ImagePicker from 'react-native-image-picker';

class PickImage extends Component {
  static propTypes = { onImagePick: PropTypes.func };
  static defaultProps = { onImagePick: null };

  state = {
    pickedImage: null
  };

  pickImage = () => {
    ImagePicker.showImagePicker({
      title: 'Pick an Image'
    }, res => {
      if (res.didCancel) return console.log('Pick cancelled by user');
      if (res.error) return console.log('Image pick error', res.error);

      this.setState({ pickedImage: { uri: res.uri } });
      this.props.onImagePick && this.props.onImagePick(res);
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image style={styles.previewImage} source={this.state.pickedImage} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Pick image" onPress={this.pickImage} />
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
  },
  previewImage: {
    width: '100%',
    height: '100%'
  }
});

export default PickImage;
