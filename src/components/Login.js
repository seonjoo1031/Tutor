import React, { Component } from 'react';
import { AsyncStorage, View, Text, Platform, Image, TouchableHighlight, StatusBar, ScrollView } from 'react-native';
import { FBLoginManager } from 'react-native-facebook-login';
import { GoogleSignin } from 'react-native-google-signin';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { otherLoginUser } from '../actions';
import { LoginButton, Spinner } from './common';

const GF = require('./GF');

//눌렀을 때 로그인 버튼을 감싸고 있는 뷰가 스피너로 바뀌게.

class Login extends Component {
  state = { user: null };

  componentWillMount() {
    if (Platform.OS === 'ios') {
      GoogleSignin.configure({
        iosClientId: '33230911454-bhm9ll8r3f1bclah0lr6iiqatuelj06t.apps.googleusercontent.com' //ios 설정 필요함.
      })
      .then(() => {});
    } else {
      GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {})
      .catch((err) => {
        alert(err.message);
      });
      GoogleSignin.configure({
        webClientId: '1005999098966-bveirigjrl7a4mqfiqq5aeqconlsm654.apps.googleusercontent.com'
      })
      .then(() => {
      });
    }
  }

  onFBLoginBtnPress() {
    if (Platform.OS !== 'ios') {
      FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Web);
      console.log('FB press');
    }
    FBLoginManager.loginWithPermissions(["email", "user_friends"], function (error, data) {
      if (!error) {
      const api = `https://graph.facebook.com/v2.3/${data.credentials.userId}?fields=name,email&access_token=${data.credentials.token}`;
        fetch(api)
        .then((response) => response.json())
        .then((res) => {
          this.handleResponseFB(res)
        })
        .catch((err) => console.log('error occurred', err.message))
        .done();
      } else {
        console.log('Error: ', error);
      }
    }.bind(this));
  }

  onGoogleLoginBtnPress() {
    GoogleSignin.signIn()
    .then((user) => {
      this.setState({
        user: user
      });
      this.props.otherLoginUser(this.state.user.email, 'google');
    })
    .catch((err) => {
      console.log('google signin error');
      console.log(err);
    }).done();
  }

  onEmailLoginBtnPress() {
    console.log('login button');
    Actions.loginForm();
  }

  handleResponseFB(res) {
    // 내려오는 response가 이름, ID, EMAIL
    this.props.otherLoginUser(res.email, 'facebook');
  }
  // 나중에 js 파일로 뺄 것!
  renderRingleLogo() {
    if (Platform.OS === 'ios') {
      return (
        <Image style={{ width: 100, height: 100 }} source={require('../../Resource/logo1.png')} />
      );
    } else {
      return (
        <Image style={{ width: 150, height: 150 }} source={require('../../Resource/logo1.png')} />
      );
    }
  }

  renderSpinner() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <ScrollView style={[{ flex: 1, backgroundColor: '#f9f9f4' }, GF.border('red')]} >
        <StatusBar
         backgroundColor="#7a5de8"
         barStyle="default"
        />
        <View style={{ backgroundColor: '#f9f9f4', marginBottom: 20 }} >
          <View style={{ alignItems: 'center', marginTop: 150 }}>
            {this.renderRingleLogo()}
            {this.renderSpinner()}
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between',
            marginLeft: 30, marginRight: 30, marginTop: 40 }}>
              <LoginButton
              onPress={this.onFBLoginBtnPress.bind(this)}
              iconName='facebook-f' color='#29487d'
              />
              <LoginButton
              onPress={this.onGoogleLoginBtnPress.bind(this)}
              iconName='google' color='#dd4b39'
              />
              <LoginButton
              onPress={this.onEmailLoginBtnPress.bind(this)}
              iconName='envelope-o' color='#7a5de8'
              />
            </View>
          </View>
          <View style={{ alignItems: 'center'}}>
            <TouchableHighlight
            style={{ width: 80, height: 30, alignItems: 'center', marginTop: 25 }}
            underlayColor='#CCCCF2'
            onPress={() => Actions.signup()}
            >
            <Text style={{ fontSize: 18, color: '#7a5de8', textDecorationLine: 'underline' }}> 회원가입</Text>
            </TouchableHighlight>
          </View>
          <View style={{ flexDirection: 'column', marginTop: 30, marginLeft: 30, marginRight: 16, alignItems: 'center' }}>
            <View>
              <Text style={{ fontSize: 13, color: '#7a5de8' }}>회원가입을 하시면 Ringle의{'\n'}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableHighlight
              underlayColor='#CCCCF2'
              onPress={() => Actions.privacyPolicy()}
              >
              <Text style={{ fontSize: 13, color: '#7a5de8', textDecorationLine: 'underline' }}> 개인정보 보호정책</Text>
              </TouchableHighlight>
              <Text style={{ fontSize: 13, color: '#7a5de8' }}>에 동의하는 것입니다.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { loading } = auth;

  return { loading };
};

export default connect(mapStateToProps, { otherLoginUser })(Login);
