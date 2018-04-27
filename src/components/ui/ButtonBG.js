import React from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Text,
  View,
  StyleSheet
} from 'react-native';

/**
 * Button with customizable background color
 * @param  {Node} children - button content
 * @param  {String} background - background color
 * @param  {String} textColor - text color
 * @param  {Function} onPress
 */
const ButtonBG = ({ children, background, textColor, onPress }) => {
  const ButtonElement = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <ButtonElement onPress={onPress}>
      <View style={[styles.button, { backgroundColor: background }]}>
        <Text style={{ color: textColor }}>{children}</Text>
      </View>
    </ButtonElement>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 4,
  }
});

export default ButtonBG;
