import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const GF = require('../GF');
//<Text>{iconName}</Text>
//borderColor 설정
const LoginButton = ({ onPress, text, color}) => {
  const { loginButtonStyle, textStyle } = styles;

  return (
    <View>
      <TouchableOpacity
        underlayColor='#CCCCF2'
        onPress={onPress}
      >
        <View style={[loginButtonStyle, {backgroundColor:color}]}>
          <Text style={textStyle}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  loginButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    height:45,
    padding: 10,
    borderRadius: 30,
    marginTop: 25,
  },
  textStyle: {
    fontFamily:'Raleway',
    fontSize:15,
    color:'#7a5de8'
  }
};

export { LoginButton };
