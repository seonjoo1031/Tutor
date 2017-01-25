import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const MainButton = (props) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={props.onPress} style={[buttonStyle, props.style]}>
      <Text style={textStyle}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};
//borderRadius: 5,
const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#7a5de8',
    fontSize: 12,
    fontFamily: 'Avenir-Heavy'
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f4',
    borderWidth: 2,
    borderColor: '#7a5de8',
    marginLeft: 8,
    marginRight: 10,
    marginTop: 5,
    height: 35,

  }
};

export { MainButton };
