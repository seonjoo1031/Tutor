import React, { Component } from 'react';
import { View, Platform, AsyncStorage, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { loginUser, otherLoginUser } from '../actions';
import { Spinner, Input, Button } from './common';

class Splash extends Component {

  componentWillMount() {
    this.isAutoLoginChecked();
  }

  isAutoLoginChecked() {
    console.log(AsyncStorage.getAllKeys());
    AsyncStorage.getItem('signin').then((value) => {
      if (value === 'on') {
        console.log('signin is ON');
        AsyncStorage.getItem('login_channel').then((channel) => {
          if (channel === 'facebook' || channel === 'google') {
            AsyncStorage.getItem('email').then((userEmail) => {
              this.props.otherLoginUser(userEmail);
            });
          } else if (channel === 'email') {
            AsyncStorage.multiGet(['email', 'password']).then((userInfo) => {
              this.props.loginUser(userInfo[0][1], userInfo[1][1], 'email');
            });
          }
        });
      } else {
        console.log('signin is OFF');
        Actions.auth();
      }
    });
  }

  // onEmailChanged(event){
  //   console.log(this.state.email);
  //   this.setState({ email: event.nativeEvent.text.toLowerCase() });
  // }

  render() {
    return (
      <View style={styles.splash}>
        <Image style={{ width: 160, height: 160 }} source={require('../../Resource/logo1.png')} />
      </View>
    );
  }
}

const styles = {
  splash: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  font_ubuntu_ios: {
    fontFamily: 'Ubuntu-Light',
  },
  font_ubuntu_android: {
    fontFamily: 'Ubuntu-L',
  }
};

export default connect(null, { loginUser, otherLoginUser })(Splash);
