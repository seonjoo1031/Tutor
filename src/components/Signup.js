import React, { Component } from 'react';
import { Text, View, AsyncStorage, Alert, Platform, TextInput, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Spinner, Input, Button } from './common';
import {
  emailChanged,
  passwordChanged,
  // passwordConfirmChanged,
  // nameChanged,
  // firstNameChanged,
  // phoneNumberChanged,
  // referralChanged,
  // jobChanged,
  // promoCodeChanged,
  loginUser
 } from '../actions';
 import { urlForSignup } from '../components/common/ApiUrl';
 import Navibar from './common/Navibar';

class Signup extends Component {
  componentWillMount() {
    if(this.props.existing_email!==''){
      this.onEmailChange(this.props.existing_email);
    }
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  // onPasswordConfirmChange(text) {
  //   this.props.passwordConfirmChanged(text);
  // }
  //
  // onNameChange(text) {
  //   this.props.nameChanged(text);
  // }
  //
  // onFirstNameChange(text) {
  //   this.props.firstNameChanged(text);
  // }
  //
  // onphoneNumberChange(text) {
  //   this.props.phoneNumberChanged(text);
  // }
  // //newly added three methods.
  // onJobChange(text) {
  //   this.props.jobChanged(text);
  // }
  //
  // onPromotionCodeChange(text) {
  //   this.props.promoCodeChanged(text);
  // }
  //
  // onReferralChange(text) {
  //   this.props.referralChanged(text);
  // }

  onSigninButtonPress() {
    if(this.props.email === '') {
      alert('Email을 입력해주세요.');
      return;
    }

    if(this.props.password === '' || this.props.password.length < 6) {
      alert('Password를 잘못 입력하셨습니다.');
      return;
    }

    // if(this.props.firstName === '') {
    //   alert('First name을 입력해주세요.');
    //   return;
    // }
    //
    // if(this.props.phoneNumber === '') {
    //   alert('핸드폰 번호를 입력해주세요.'); // 처리를 더 해줘야할듯.
    //   return;
    // }
    //
    // if(this.props.password !== this.props.passwordConfirm) {
    //   alert('입력하신 비밀번호가 일치하지 않습니다.')
    //   return;
    // }

    fetch(urlForSignup(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.props.email,
        password: this.props.password
        // korean_name: this.props.name,
        // first_name: this.props.firstName,
        // phone: this.props.phoneNumber,
        // promoCode: this.props.promoCode,
        // referral: this.props.referral
      })
    })
    .then(response => response.json())
    .then(json => this.handleResponse(json.response))
    .catch(error =>
      console.log(error)
    )
    .done();
  }

  handleResponse(response) {
    if (response.application_response_code === '100') {
      AsyncStorage.multiSet([['login_channel', 'email'], ['signin', 'on'],
      ['email', this.props.email], ['password', this.props.password]]);
      const { email, password } = this.props;
      //여기서 빈 값 처리 해주면 될 듯
      this.props.loginUser(email, password);
    } else {
      Alert.alert(response.message);
    }
  }

  renderSigninButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onSigninButtonPress.bind(this)}>
        로그인
      </Button>
    );
  }

  render() {
    console.log(this.props);

    return (
      <View style={{ flex: 1, backgroundColor: '#f9f9f4' }}>
      <Navibar title='회원가입' />
        <ScrollView style={{ backgroundColor: '#f9f9f4', marginBottom: 20 }}
        keyboardShouldPersistTaps={true}>
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <View style={{ marginTop: 15 }}>
              <Input
                placeholder='Email'
                placeholderTextColor='#897FA6'
                style={styles.inputStyle}
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email}
                underlineColorAndroid='#dddddd'
                keyboardType='email-address'
              />
            </View>
            <View style={{ marginTop: 15 }}>
              <Input
                placeholder='Password(*at least 6 characters)'
                placeholderTextColor='#897FA6'
                style={styles.inputStyle}
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}
                secureTextEntry={true}
                underlineColorAndroid='#dddddd'
              />
            </View>

            {this.renderSigninButton()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    height: 50,
    marginRight: 5,
    flex: 1,
    fontSize: 17,
    color: '#2e2b4f',
    paddingLeft: 10,
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password } = auth;

  return { email, password };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser
})(Signup);
