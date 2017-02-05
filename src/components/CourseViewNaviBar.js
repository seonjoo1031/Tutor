import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MIcon from 'react-native-vector-icons/MaterialIcons';


const GF = require('./GF');


class CourseViewNaviBar extends Component {
  render() {
    const { title, opacity } = this.props;
    if(Platform.OS === 'ios') {
      return (
        <View style={[{ position: 'absolute', top: 0, left: 0, right: 0 }]}>
          <View style={[{ position: 'absolute', top: 0, left: 0, right: 0, height: 20, backgroundColor: '#7a5de8' }]}/>
          <View style={[{ position: 'absolute', top: 0, left: 0, right: 0, height: 60,
            justifyContent: 'center',
            backgroundColor: '#fff',
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 2,
            shadowOffset: {
               height: 1,
               width: 0
             },
            opacity: opacity }]}
          >

          </View>
          <View>
            <View style={{ height: 20, backgroundColor: '#7a5de8' }}/>
            <View style={[{ height: 40,
              backgroundColor: 'transparent', flexDirection:'row', alignItems:'center' },GF.border('red')]}
            >


              <TouchableOpacity underlayColor='#dddddd' style={[GF.border('yellow')], { paddingLeft: 8, paddingRight: 8 }} onPress={() => Actions.pop()}>
                <View style={{opacity:opacity}}>
                <MIcon name='chevron-left' size={24} color='#7a5de8' />
                </View>
              </TouchableOpacity>

              <Text style={{ fontSize: 15, color: '#7a5de8', fontFamily: 'Raleway', opacity:opacity }} numberOfLines={1}>
              {title}
              </Text>

            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={[{ position: 'absolute', top: 0, left: 0, right: 0 }]}>
          <View style={[{ position: 'absolute', top: 0, left: 0, right: 0, height: 55,
            backgroundColor: '#fff',
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 2,
            shadowOffset: {
               height: 1,
               width: 0
             },
            opacity: opacity, paddingLeft: 30, justifyContent: 'center', alignItems: 'center' }]}
          >
            <Text style={{ fontSize: 20, color: '#7a5de8' }} numberOfLines={1}>
            {title}
            </Text>
          </View>
          <View style={[{ position: 'absolute', top:0, left: 0, right: 0, height: 60,
            backgroundColor: 'transparent', paddingTop: 0, paddingLeft: 0, justifyContent: 'center' },GF.border('red')]}
          >
            <TouchableOpacity underlayColor='#dddddd' style={[GF.border('yellow'),{paddingLeft:10}]} onPress={() => Actions.pop()}>
            <Image
            style={{ width: 25, height: 25, opacity: opacity }}
            source={require('../../Resource/back32.png')}
            />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}


export default CourseViewNaviBar;
