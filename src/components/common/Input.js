import React from 'react';
import { TextInput, View, Platform } from 'react-native';

//<!-- add max length property!

const Input = ({ value, onChangeText, placeholder, secureTextEntry, maxLength, keyboardType, underlineColorAndroid, selectionColor }) => {
  const { inputStyleAndroid, containerStyle, inputStyleIOS } = styles;

  return (
    <View style={containerStyle}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor="#897FA6"
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
    height: 50,
    marginRight: 5,
    flex: 1,
    fontSize: 17,
    color: '#2e2b4f',
    paddingLeft: 10,
    borderWidth:1,
    borderColor:'#2e2b4f',
    borderRadius:8,
  },
  inputStyleAndroid: {
    height: 50,
    marginRight: 5,
    flex: 1,
    fontSize: 17,
    color: '#2e2b4f',
    paddingLeft: 10,
  },
  containerStyle: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  }
};

export { Input };
