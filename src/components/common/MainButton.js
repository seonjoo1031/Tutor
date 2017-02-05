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
    fontFamily: 'Raleway'
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f4',
    borderWidth: 1,
    borderColor: '#7a5de8',
    borderRadius:20,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 8,
    height: 35,

  }
};

export { MainButton };
