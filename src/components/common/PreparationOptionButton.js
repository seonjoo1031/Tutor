import React from 'react';
import { TouchableHighlight, View, Text, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

const PreparationOptionButton = ({ onPress, type, buttonText }) => {
  return (
    <TouchableHighlight style={{ borderWidth: 1, borderRadius:15, borderColor: '#7a5de8',
    width: width*0.33, height: 35, marginRight: 15,
    justifyContent: 'center'

    }}
            underlayColor='#CCCCF2' onPress={() => onPress(type)}
    >
        <View style={{ alignItems: 'center' }}>
          <Text style={[{ fontSize: 13, color: '#7a5de8', fontFamily: 'Raleway' }]}>{buttonText}</Text>
        </View>
    </TouchableHighlight>
  );
};

export { PreparationOptionButton };
