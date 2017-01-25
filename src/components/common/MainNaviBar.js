import React, { Component } from 'react';
import { View, Image, Platform, TouchableHighlight, DrawerLayoutAndroid, Text } from 'react-native';

class MainNaviBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  render() {


    if (Platform.OS === 'ios') {
      return (
        <View style={{ height: 70 }}>
          <View style={{ backgroundColor: '#7a5de8', height: 20 }} />
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff' }}>
            <Image style={{ width: 40, height: 40 }} source={require('../../../Resource/logo1.png')} />
          </View>

          <View style={{ position: 'absolute', top: 69, left: 0, right: 0, height: 1, backgroundColor: '#e3decf' }} />
        </View>
      );
    } else {
      return (
        <View
          style={[{ alignItems: 'center',
          backgroundColor: '#ffffff',
          height: 55, paddingTop: 8 }]} >
          <Image style={{ width: 40, height: 40 }} source={require('../../../Resource/logo1.png')} />

          <View style={{ position: 'absolute', top: 54, left: 0, right: 0, height: 1, backgroundColor: '#e3decf' }} />
        </View>
      );
    }
  }
}

export default MainNaviBar;
