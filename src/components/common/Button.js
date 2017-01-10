import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
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
    fontSize: 15,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f4',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#7a5de8',
    marginLeft: 8,
    marginRight: 10,
    marginTop: 5,
    width: 100,
    height: 40
  }
};

export { Button };
