import React, { Component } from 'react';
import { View, TouchableHighlight, Text, Platform, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

const GF = require('../GF');

class Navibar extends Component {

  render() {
    const { title } = this.props;
    if (Platform.OS === 'ios') {
      return (
        <View style={{ height: 65 }}>
          <View style={{ backgroundColor: '#7a5de8', height: 20 }} />

          <View style={{ backgroundColor: '#ffffff', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#442dc9', fontSize: 20 }}>
            {title}
            </Text>
          </View>
          
            <TouchableHighlight style={{ position: 'absolute', top: 29, left: 0, right: 0, width: 200, height: 50 }} underlayColor='transparent' onPress={() => { Actions.pop(); }} >
            <Image
            style={{ width: 25, height: 25 }}
            source={require('../../../Resource/back32.png')}
            />
            </TouchableHighlight>

          <View style={{ position: 'absolute', top: 64, left: 0, right: 0, height: 1, backgroundColor: '#e3decf' }} />
        </View>
      );
    } else {
      return (
        <View
        style={[styles.naviBarStyle, GF.border('green'), Platform.OS === 'ios' ? { marginTop: 20 } : { marginTop: 0 }]}
        >
          <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={[GF.border('black')], { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
              <Text
              style={{ color: '#442dc9', fontSize: 25 }}
              >
              {title}
              </Text>
            </View>
          </View>
          <View
          style={[{ position: 'absolute', left: 0, right: 0, width: 50, height: 50 },
          GF.border('red'), Platform.OS === 'ios' ? { position: 'absolute', top: 0 } : { position: 'absolute', top: 0 }]}
          >
            <View style={[Platform.OS === 'ios' ? { } : {marginTop: 4 }]}>
              <TouchableHighlight
              style={[{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }, GF.border('green')]} underlayColor='transparent' onPress={() => { Actions.pop(); }}>
              <Image
              style={{ width: 25, height: 25 }}
              source={require('../../../Resource/back32.png')}
              />
              </TouchableHighlight>
            </View>
          </View>
          <View style={{ position: 'absolute', top: 53, left: 0, right: 0, height: 0.7, backgroundColor: '#e3decf' }} />
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
