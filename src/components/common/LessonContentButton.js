import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, View, Text } from 'react-native';

const LessonContentButton = ({ onPress, textType, contentType, icon }) => {
  return (
    <TouchableOpacity
    style={{ paddingLeft: 10, paddingRight: 10 }}
    onPress={() => onPress(contentType)}
    >
      <View style={{alignItems: 'center'}}>
        <Icon name={icon} size={24} color='#7a5de8' />
        <Text style={{ paddingTop:5, fontSize: 13, color: '#7a5de8', fontFamily:'Raleway'}}>
        {textType}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export { LessonContentButton };
