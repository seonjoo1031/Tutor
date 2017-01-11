import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Spinner, Button, Input } from './common';
import Navibar from './common/Navibar';

const GF = require('./GF');

class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text.toLowerCase());
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text.toLowerCase());
  }

  onSignupButtonPress() {
    Actions.signup();
  }

  onLoginButtonPress() {
    //여기서 빈 값 처리 해주면 될 듯
    console.log(this.props);
    this.props.loginUser(this.props.email, this.props.password, 'email');
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onLoginButtonPress.bind(this)}>
        로그인
      </Button>
    );
  }
  // Login.js로 뻄
  // renderSignupButton() {
  //   return (
  //     <Button onPress={this.onSignupButtonPress.bind(this)}>
  //       Sign Up
  //     </Button>
  //   );
  // }

  render() {
    console.log('login form render');
    console.log(this.props);
    return (
      <View style={{ backgroundColor: '#f9f9f4', flex: 1 }}>
        <Navibar title='로그인' />
          <Input
            placeholder="student@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
            keyboardType='email-address'
          />
          <View style={{ marginTop: 10 }} />
          <Input
            secureTextEntry
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
          <View style={{ marginTop: 10 }}>
          {this.renderButton()}
          </View>
      </View>
    );
  }
}

const styles = {
  emailpart: {
    paddingTop: 30,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 10,
    backgroundColor: '#f9f9f4'
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginForm);
