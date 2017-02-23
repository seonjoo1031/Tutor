import React, { Component } from 'react';
import { AsyncStorage, View, Text, Platform, Image, TouchableOpacity, StatusBar, ScrollView, Dimensions } from 'react-native';
import { FBLoginManager } from 'react-native-facebook-login';
import { GoogleSignin } from 'react-native-google-signin';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import EvilIcon from 'react-native-vector-icons/EvilIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import { otherLoginUser, emailChanged, passwordChanged, loginUser } from '../actions';
import { LoginButton, OtherLoginButton, Spinner, SignInput } from './common';

const GF = require('./GF');

//눌렀을 때 로그인 버튼을 감싸고 있는 뷰가 스피너로 바뀌게.

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Login extends Component {
  state = { user: null };

  componentWillMount() {
    if (Platform.OS === 'ios') {
      GoogleSignin.configure({
        iosClientId: '327989125487-38n9b5kegm29kd2j667cqcjjfsj2sv0f.apps.googleusercontent.com' //ios 설정 필요함.
      })
      .then(() => {});
    } else {
      GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {})
      .catch((err) => {
        alert(err.message);
      });
      GoogleSignin.configure({
        webClientId: '327989125487-m0geig9msh8j6k07khpl19ldmclnbf2g.apps.googleusercontent.com'
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
          console.log('facebook login', res);
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

  handleResponseFB(res) {
    // 내려오는 response가 이름, ID, EMAIL
    this.props.otherLoginUser(res.email, 'facebook');
  }
  // 나중에 js 파일로 뺄 것!
  renderRingleLogo() {
    if (Platform.OS === 'ios') {
      return (
        <Image style={{ width: width*0.45, height: width*0.45 }} source={require('../../Resource/logo2.png')} />
      );
    } else {
      return (
        <Image style={{ width: 150, height: 150 }} source={require('../../Resource/logo2.png')} />
      );
    }
  }

  renderSpinner() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
  }

  //onChangeText={this.onEmailChange.bind(this)}
  //value={this.props.email}

  onEmailChange(text) {
    this.props.emailChanged(text.toLowerCase());
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text.toLowerCase());
  }

  onSignupButtonPress() {
    console.log('sign up on press');
    Actions.signup();
  }

  onLoginButtonPress() {
    //여기서 빈 값 처리 해주면 될 듯
    console.log(this.props);
    this.props.loginUser(this.props.email, this.props.password, 'email');
  }

  renderError() {
    if(this.props.error!==''){

      return (
        <View style={{alignItems:'center', justifyContent:'center'}}>
        <View style={{backgroundColor:'#dd4b39', opacity:0.8, flexDirection:'row', paddingLeft:5, paddingRight:5}}>
        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>
        <MIcon name='error' size={20} color='#f5f5fc' style={{paddingLeft:5}} />
        </View>
        </View>
      );
    }
  }

  renderInput() {
    return(
      <View style={{height:height*0.5}}>


        {this.renderError()}


        <View style={{flexDirection:'row', width:width-60, alignItems:'center'}}>
          <MIcon name='email' style={styles.iconStyle} />
          <SignInput
            placeholder="Email"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
            keyboardType='email-address'
          />
        </View>


        <View style={styles.separator} />

        <View style={{flexDirection:'row', width:width-60, alignItems:'center', marginTop:10}}>
          <MIcon name='lock' style={styles.iconStyle} />
          <SignInput
            secureTextEntry
            placeholder="Password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </View>

        <View style={styles.separator} />

        <LoginButton
        onPress={this.onLoginButtonPress.bind(this)}
        text='Log In' color='#f5f5fc'
        />

        <Text style={[styles.textStyle, {marginTop:15, alignSelf:'center', opacity:0.8}]}>Or login with</Text>

        <View style={{flexDirection:'row', width:width-60, height:45}}>
          <View style={{paddingRight:5, flex:1}}>
          <OtherLoginButton
          onPress={this.onFBLoginBtnPress.bind(this)}
          iconName='facebook-f' text='Facebook' color='#29487d'
          />
          </View>

          <View style={{paddingLeft:5, flex:1}}>
          <OtherLoginButton
          onPress={this.onGoogleLoginBtnPress.bind(this)}
          iconName='google' text='Google+' color='#dd4b39'
          />
          </View>
        </View>

        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:35}}>
          <Text style={[styles.textStyle, {opacity:0.8}]}>
            {"Don't have an account?"}
          </Text>

          <TouchableOpacity
          style={{ paddingLeft: 10, paddingRight: 10 }}
          underlayColor='#CCCCF2'
          onPress={this.onSignupButtonPress.bind(this)}
          >
              <Text style={{ fontSize: 15, color: '#f5f5fc', fontFamily:'Raleway'}}>
              Sign Up
              </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    console.log(width, height);

    return (
      <KeyboardAwareScrollView style={[{ flex: 1, backgroundColor: '#7a5de8' }, GF.border('red')]} keyboardShouldPersistTaps={true}>
        <StatusBar
         backgroundColor="#7a5de8"
         barStyle="default"
        />
        <View>
          <View style={{ alignItems: 'center', marginTop: height*0.15}}>
            {this.renderRingleLogo()}
            {this.renderSpinner()}
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flex:1,
            marginLeft: 30, marginRight: 30, marginTop: 20}}>
              {this.renderInput()}
            </View>
          </View>


        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 13,
    color: '#f5f5fc',
    fontFamily: 'Raleway'
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd',
    opacity:0.3,
  },
  errorTextStyle: {
    fontSize: 15,
    alignSelf: 'center',

    color:'#f5f5fc',

    fontFamily:'Raleway',
  },
  iconStyle: {
    fontSize:25,
    color:'#f5f5fc',
    paddingLeft:10,
    paddingRight:20,
    opacity:0.8
  }

};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser, otherLoginUser })(Login);
