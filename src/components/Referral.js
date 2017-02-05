import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, ListView, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import MIcon from 'react-native-vector-icons/MaterialIcons';

import NaviBar from './common/Navibar';


const GF = require('./GF');

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


class Referral extends Component {

  render() {
    return(

      <View style={[GF.border('red'), { flex: 1, backgroundColor: '#f9f9f4' }]}>


          <NaviBar title='Referral Program'/>
          <View style={{ flex: 1, backgroundColor: '#f9f9f4', paddingTop:30, alignItems:'center'}}>

          <MIcon name='card-giftcard' size={60} color='#7a5de8' style={{opacity:0.6, marginBottom:15}} />

          <Text style={styles.textStyle}>
            Refer friends and get $10 bonus per person.
          </Text>

          <View style={{height:25}} />

          <View style={styles.separator} />

          <View style={{height:25}} />

          <Text style={[styles.textStyle, {color:'#897FA6'}]}>
            My Referral code
          </Text>


          <Text style={styles.codeTextStyle}>
            {this.props.user.promo_code}
          </Text>

          <MIcon name='more-horiz' size={30} color='#7a5de8' style={{opacity:0.4, marginBottom:5}} />

          <Text style={styles.textStyle}>
            If your friend joins and tutors 10 classes,
          </Text>
          <Text style={styles.textStyle}>
            you will get another $10 bonus per person.
          </Text>
          <View style={{height:10}} />

          <Text style={styles.textStyle}>
            If your friend put your code during sign up,
          </Text>
          <Text style={styles.textStyle}>
            then it works.
          </Text>

        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.auth;
  return {
    user: user,

  };
};

const styles = {
  codeTextStyle: {
    fontFamily: 'Raleway',
    fontSize: 20,
    color: 'rgba(122,93,232,1)',
    marginBottom:5
  },

  textStyle : {
    fontFamily:'Raleway', color:'#2e2b4f', alignSelf:'center', paddingBottom:5, fontSize:14
  },

  separator: {
    height: 1,
    width:width*0.9,
    backgroundColor: '#dddddd'
  }
};

export default connect(mapStateToProps, null)(Referral);
