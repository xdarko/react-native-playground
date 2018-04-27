import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import { loginAttempt } from '../store/actions';
import { Input, TextMain, TextHeader, ButtonBG } from '../components/ui';
import startMainTabs from './main-tabs/startMainTabs';
import validateFormField from '../utils/validation';
import backgroundImage from '../assets/background.jpg';

class AuthScreen extends Component {
  state = {
    authMode: 'signup',
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
    this.props.loginAttempt({
      email: this.state.formFields.email.value,
      password: this.state.formFields.password.value
    });
    startMainTabs();
  };

  checkScreenOrientation = dimensions => {
    if (dimensions.window.height < 500) {
      this.setState({ portraitMode: false });
    } else {
      this.setState({ portraitMode: true });
    }
  };

  switchAuthMode = () => {
    this.setState({
      authMode: this.state.authMode === 'signup' ? 'login' : 'signup'
    });
  };

  handleFieldChange = (fieldName, fieldValue) => {
    const { validationRules } = this.state.formFields[fieldName];
    const compareFieldName = this.state.formFields[fieldName].validationRules.equalTo;
    const compareValue = compareFieldName && this.state.formFields[compareFieldName].value;

    this.setState(prevState => ({
      formFields: {
        ...prevState.formFields,
        [fieldName]: {
          ...prevState.formFields[fieldName],
          value: fieldValue,
          valid: validateFormField(fieldValue, validationRules, compareValue)
        }
      }
    }));
  };

  render() {
    const { portraitMode } = this.state;
    return (
      <ImageBackground style={styles.backgroundImage} source={backgroundImage}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          
          {portraitMode && (
            <TextMain>
              <TextHeader>
                Please {this.state.authMode === 'login' ? 'Log In' : 'Sign Up'}
              </TextHeader>
            </TextMain>
          )}

          <ButtonBG
            background="#29aaf4"
            textColor="#fff"
            onPress={this.switchAuthMode}
          >
            Switch to {this.state.authMode === 'login' ? 'Sign Up' : 'Log In'}
          </ButtonBG>

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <Input
                style={styles.input}
                value={this.state.formFields.email.value}
                onChangeText={value => this.handleFieldChange('email', value)}
                placeholder="Email Address"
                valid={this.state.formFields.email.valid}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />

              <View
                style={
                  portraitMode || this.state.authMode === 'login'
                    ? styles.pwdContainer_portrait
                    : styles.pwdContainer_landscape
                }
              >
                <View
                  style={
                    portraitMode || this.state.authMode === 'login'
                      ? styles.pwdWrapper_portrait
                      : styles.pwdWrapper_landscape
                    }
                >
                  <Input
                    style={styles.input}
                    value={this.state.formFields.password.value}
                    onChangeText={value => this.handleFieldChange('password', value)}
                    placeholder="Password"
                    valid={this.state.formFields.password.valid}
                    secureTextEntry
                  />
                </View>
                
                {this.state.authMode === 'signup' && (
                  <View
                    style={
                      portraitMode
                        ? styles.pwdWrapper_portrait
                        : styles.pwdWrapper_landscape
                    }
                  >
                    <Input
                      style={styles.input}
                      value={this.state.formFields.confirmPassword.value}
                      onChangeText={value => this.handleFieldChange('confirmPassword', value)}
                      placeholder="Confirm Password"
                      valid={this.state.formFields.confirmPassword.valid}
                      secureTextEntry
                    />
                  </View>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>

          <ButtonBG background="#29aaf4" textColor="#fff" onPress={this.onLogin}>Submit</ButtonBG>
        </KeyboardAvoidingView>
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

const mapDispatchToProps = { loginAttempt };

export default connect(null, mapDispatchToProps)(AuthScreen);
