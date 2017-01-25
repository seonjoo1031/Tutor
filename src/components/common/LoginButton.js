import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const GF = require('../GF');
//<Text>{iconName}</Text>
//borderColor 설정
const LoginButton = ({ onPress, iconName, color }) => {
  const { loginButtonStyle } = styles;

  return (
    <View style={[{ flex: 1 }, GF.border('red')]}>
      <TouchableHighlight
        underlayColor='#CCCCF2'
        onPress={onPress}
      >
        <View style={[loginButtonStyle, { borderColor: color }]}>
          <Icon name={iconName} size={24} color={color} />
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = {
  loginButtonStyle: {
    flexDirection: 'row',
    borderWidth: 2,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    marginBottom: 10,
    borderRadius: 7,
    marginTop: 10
  }
};

export { LoginButton };
