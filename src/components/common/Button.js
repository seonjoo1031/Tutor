import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, style }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, style]}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#7a5de8',
    fontSize: 13,
    fontFamily: 'Raleway'
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f4',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#7a5de8',
    margin:5,
    height: 35
  }
};

export { Button };
