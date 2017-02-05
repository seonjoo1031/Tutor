import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import MIcon from 'react-native-vector-icons/MaterialIcons';


const MySettingCard = ({ label, content, icon }) => {
  const { separator } = styles;

  return (


    <View >
      <TouchableOpacity underlayColor='red' >
        <View
        style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between',
        paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10 }}
        >
          <View style={{flexDirection:'row'}}>
            <MIcon name={icon} size={20} color='#7a5de8' style={{opacity:0.7}} />
            <Text style={{ paddingLeft:10, color: '#897FA6', fontFamily: 'Raleway', fontSize:13 }}>{label}</Text>
          </View>
          <Text style={{ color: '#2e2b4f', fontFamily: 'Raleway' }}>{content}</Text>
        </View>
      </TouchableOpacity>
      <View style={separator} />
    </View>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 7,
    marginRight: 2
  },
  listButtonStyle: {
    backgroundColor: '#28b496',
    width: 100
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  }
};

export { MySettingCard };
