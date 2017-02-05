import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const GF = require('../GF');
//<Text>{iconName}</Text>
//borderColor 설정
const OtherLoginButton = ({ onPress, text, color, iconName}) => {
  const { loginButtonStyle, textStyle } = styles;

  return (
    <View style={[{ flex: 1 }, GF.border('red')]}>
      <TouchableOpacity
        onPress={onPress}
      >
        <View style={[loginButtonStyle, {backgroundColor:color}]}>
          <Icon name={iconName} size={20} color='#f5f5fc' style={{paddingRight:10}} />
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
    marginTop: 15,
  },
  textStyle: {
    fontFamily:'Raleway',
    fontSize:14,
    color:'#f5f5fc'
  }
};

export { OtherLoginButton };
