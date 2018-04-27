import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Input, TextMain, TextHeader, ButtonBG } from '../components/ui';
import startMainTabs from './main-tabs/startMainTabs';
import backgroundImage from '../assets/background.jpg';

class AuthScreen extends Component {
  state = {
    portraitMode: true, // whether device has a portrait screen orientation
    formFields: {
      email: {
        value: '',
        valid: false,
        validationRules: {
          isEmail: true
        }
      },
      password: {
        value: '',
        valid: false,
        validationRules: {
          minLength: 6
        }
      },
      confirmPassword: {
        value: '',
        valid: false,
        validationRules: {
          equalTo: 'password'
        }
      }
    }
  };

  componentWillMount() {
    Dimensions.addEventListener('change', this.checkScreenOrientation);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.checkScreenOrientation);
  }

  onLogin = () => {
    startMainTabs();
  };

  checkScreenOrientation = dimensions => {
    if (dimensions.window.height < 500) {
      this.setState({ portraitMode: false });
    } else {
      this.setState({ portraitMode: true });
    }
  };

  handleFieldChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
    this.setState(prevState => ({
      formFields: {
        ...prevState.formFields,
        [fieldValue]: { ...prevState.formFields[fieldName], value: fieldValue }
      }
    }));
  };

  render() {
    const { portraitMode } = this.state;
    return (
      <ImageBackground style={styles.backgroundImage} source={backgroundImage}>
        <View style={styles.container}>
          
          {portraitMode && (
            <TextMain>
              <TextHeader>Please Log In</TextHeader>
            </TextMain>
          )}

          <ButtonBG
            background="#29aaf4"
            textColor="#fff"
            onPress={() => console.log('Touched!')}
          >
            Switch to Log In
          </ButtonBG>
          <View style={styles.inputContainer}>
            <Input
              style={styles.input}
              value={this.state.formFields.email.value}
              onTextChange={value => this.handleFieldChange('email', value)}
              placeholder="Email Address"
            />

            <View
              style={
                portraitMode
                  ? styles.pwdContainer_portrait
                  : styles.pwdContainer_landscape
              }
            >
              <View
                style={
                  portraitMode
                    ? styles.pwdWrapper_portrait
                    : styles.pwdWrapper_landscape
                  }
              >
                <Input style={styles.input} placeholder="Password" />
              </View>
              <View
                style={
                  portraitMode
                    ? styles.pwdWrapper_portrait
                    : styles.pwdWrapper_landscape
                }
              >
                <Input style={styles.input} placeholder="Confirm Password" />
              </View>
            </View>

          </View>
          <ButtonBG background="#29aaf4" textColor="#fff" onPress={this.onLogin}>Submit</ButtonBG>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: '#f5f5f5'
  },
  backgroundImage: {
    flex: 1,
    width: '100%'
  },
  pwdContainer_portrait: {
    flexDirection: 'column'
  },
  pwdContainer_landscape: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  pwdWrapper_portrait: {
    width: '100%'
  },
  pwdWrapper_landscape: {
    width: '45%'
  }
});

export default AuthScreen;
