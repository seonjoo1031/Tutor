import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';

const PreparationOptionButton = ({ onPress, type, buttonText }) => {
  return (
    <TouchableHighlight style={{ borderWidth: 1, borderRadius:8, borderColor: '#7a5de8',
    width: 80, height: 33, marginLeft: 8, marginRight: 8,
    justifyContent: 'center'

    }}
            underlayColor='#CCCCF2' onPress={() => onPress(type)}
    >
        <View style={{ alignItems: 'center' }}>
          <Text style={[{ fontSize: 13, color: '#7a5de8', fontFamily: 'Avenir' }]}>{buttonText}</Text>
        </View>
    </TouchableHighlight>
  );
};

export { PreparationOptionButton };
