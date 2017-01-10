import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';

const PreparationOptionButton = ({ onPress, type, buttonText }) => {
  return (
    <TouchableHighlight style={{ borderWidth: 1, borderColor: '#7a5de8', width: 120, height: 35, marginLeft: 8, marginRight: 8 }}
            underlayColor='#CCCCF2' onPress={() => onPress(type)}
    >
        <View style={{ alignItems: 'center', marginTop: 5 }}>
          <Text style={[{ fontSize: 15, color: '#7a5de8' }]}>{buttonText}</Text>
        </View>
    </TouchableHighlight>
  );
};

export { PreparationOptionButton };
