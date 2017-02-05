import React, { Component } from 'react';
import { View, TouchableHighlight, Text, Platform, Image, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MIcon from 'react-native-vector-icons/MaterialIcons';

const GF = require('../GF');

const height = Dimensions.get('window').height;

class Navibar extends Component {

  render() {
    const { title } = this.props;
    if (Platform.OS === 'ios') {
      return (
        <View style={{ height: 65 }}>
          <View style={{ backgroundColor: '#7a5de8', height: 20 }} />

          <View style={{ backgroundColor: '#ffffff', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#442dc9', fontSize: 15, fontFamily: 'Raleway' }}>
            {title}
            </Text>
          </View>

          <TouchableHighlight style={{ position: 'absolute', top: 31, left: 5, right: 0, width: 200, height: 50 }} underlayColor='transparent' onPress={() => { Actions.pop(); }} >
            <MIcon name='chevron-left' size={24} color='#7a5de8' />
          </TouchableHighlight>

          <View style={{ position: 'absolute', top: 64, left: 0, right: 0, height: 1, backgroundColor: '#e3decf' }} />
        </View>
      );
    } else {
      return (
        <View
        style={{backgroundColor:'#ffffff', height:55}}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent:'center' }}>
            <View style={[GF.border('black')], { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
              <Text
              style={{ color: '#442dc9', fontSize: 15, fontFamily: 'Raleway' }}
              >
              {title}
              </Text>
            </View>
          </View>

          <TouchableHighlight style={{ position: 'absolute', top: 16, left: 10, right: 0 }} underlayColor='transparent' onPress={() => { Actions.pop(); }} >
            <MIcon name='chevron-left' size={24} color='#7a5de8' />
          </TouchableHighlight>

          <View style={{ position: 'absolute', top: 54, left: 0, right: 0, height: 1, backgroundColor: '#e3decf' }} />
        </View>
      );
    }
  }
}

const styles = {
  naviBarStyle: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 5,
    paddingVertical: 10,
    height: 54
  }
};

export default Navibar;
