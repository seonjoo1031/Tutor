import React from 'react';
import { TextInput, View, Platform } from 'react-native';


//<!-- add max length property!

const SignInput = ({ value, onChangeText, placeholder, secureTextEntry, maxLength, keyboardType, underlineColorAndroid, selectionColor }) => {
  const { inputStyleAndroid, containerStyle, inputStyleIOS } = styles;

  return (

    <View style={containerStyle}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor='#f5f5fc'
        autoCorrect={false}
        style={[Platform.OS=="ios" ? inputStyleIOS: inputStyleAndroid]}
        value={value}
        maxLength={maxLength}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        underlineColorAndroid={underlineColorAndroid}
      />
    </View>

  );
};

const styles = {
  inputStyleIOS: {
    marginRight: 5,
    flex: 1,
    fontSize: 14,
    color: '#f5f5fc',
    fontFamily:'Raleway',
  },
  inputStyleAndroid: {
    height: 50,
    marginRight: 5,
    flex: 1,
    fontSize: 15,
    color: '#f5f5fc',
  },
  containerStyle: {
    height: 45,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',

  }
};

export { SignInput };
