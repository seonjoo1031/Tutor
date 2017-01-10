import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';

const LessonContentButton = ({ onPress, textType, contentType }) => {
  return (
    <TouchableHighlight
    style={{ paddingLeft: 10, paddingRight: 10 }}
    underlayColor='#CCCCF2'
    onPress={() => onPress(contentType)}
    >
      <Text style={{ fontSize: 13, color: '#7a5de8',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: '#CCCCF2' }}
      >
      {textType}
      </Text>
    </TouchableHighlight>
  );
};

export { LessonContentButton };
