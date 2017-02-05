import React, { Component } from 'react';
import { Text, View, AsyncStorage, Alert, Platform, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';


import { Spinner, Input, Button, SignInput, LoginButton } from './common';
import {
  emailChanged,
  passwordChanged,
  passwordConfirmChanged,
  // nameChanged,
  firstNameChanged,
  // phoneNumberChanged,
  referralChanged,
  schoolChanged,
  departmentChanged,
  // jobChanged,
  // promoCodeChanged,
  loginUser,
  referralEmailCheck
 } from '../actions';
 import { urlForSignup } from '../components/common/ApiUrl';
 import Navibar from './common/Navibar';

class Signup extends Component {
  componentWillMount() {
    // console.log(this.props);
    if(this.props.existing_email!==undefined){
      this.onEmailChange(this.props.existing_email);
    }
    else{
      this.props.emailChanged('');
    }

    this.props.passwordChanged('');
  }

  onEmailChange(text) {
    this.props.emailChanged(text.toLowerCase());
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text.toLowerCase());
  }

  onPasswordConfirmChange(text) {
    this.props.passwordConfirmChanged(text.toLowerCase());
  }
  //
  // onNameChange(text) {
  //   this.props.nameChanged(text);
  // }
  //
  onFirstNameChange(text) {
    this.props.firstNameChanged(text);
  }

  onReferralChange(text) {
    this.props.referralChanged(text);
  }

  onSchoolChange(text) {
    this.props.schoolChanged(text);
  }

  onDepartmentChange(text) {
    this.props.departmentChanged(text);
  }

  onSigninButtonPress() {
    if(this.props.email === '') {
      alert('Please enter your email.');
      return;
    }

    if(this.props.password === '' || this.props.password.length < 6) {
      alert('Wrong password.');
      return;
    }

    if(this.props.firstName === '') {
      alert('Please enter your first name.');
      return;
    }

    if(this.props.school === '') {
      alert('Please enter your school name.');
      return;
    }

    if(this.props.department === '') {
      alert('Please enter your department.');
      return;
    }

    if(this.props.password !== this.props.passwordConfirm) {
      alert('The password does not match. Type the correct password.')
      return;
    }

    fetch(urlForSignup(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.props.email,
        password: this.props.password,
        first_name: this.props.firstName,
        referral: this.props.referral,
        school: this.props.school,
        department: this.props.department,
        role:1
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

      <LoginButton
      onPress={this.onSigninButtonPress.bind(this)}
      text='Create' color='#f5f5fc'
      />
    );
  }

  onDecline() {
    Actions.pop();
    this.props.emailChanged('');
    this.props.passwordChanged('');
    this.props.passwordConfirmChanged('');
    this.props.firstNameChanged('');
    this.props.referralChanged('');
    this.props.schoolChanged('');
    this.props.departmentChanged('');
  }

  onReferralEmailCheck() {
    this.props.referralEmailCheck(this.props.referral);
  }

  render() {
    console.log(this.props);

    return (
      <View style={{ flex: 1, backgroundColor: '#f9f9f4' }}>
      <View style={{ backgroundColor: '#7a5de8', height: 20 }} />
      <View style={{backgroundColor: '#7a5de8', paddingTop:10, padding:10}}>
      <TouchableOpacity
      onPress={this.onDecline.bind(this)}
      >
        <EvilIcon name='chevron-left' size={30} color='#f5f5fc' />
      </TouchableOpacity>
      </View>

        <ScrollView style={{ backgroundColor: '#7a5de8'}}
        keyboardShouldPersistTaps={true}>
          <View style={{ marginLeft: 20, marginRight: 20}}>

            <Text style={{fontFamily:'Raleway', fontSize:30, color:'#f5f5fc', paddingLeft:10, paddingTop:10}}>Sign up</Text>

            <View style={{ marginTop: 30, flexDirection:'row', alignItems:'center'}}>
              <MIcon name='email' style={styles.iconStyle} />
              <SignInput
                placeholder='Email'
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email}
                keyboardType='email-address'
              />
            </View>
            <View style={styles.separator} />

            <View style={{ marginTop: 10, flexDirection:'row', alignItems:'center'}}>
              <MIcon name='lock' style={styles.iconStyle} />
              <SignInput
                placeholder='Password (at least 6 characters)'
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.separator} />

            <View style={{ marginTop: 10, flexDirection:'row', alignItems:'center'}}>
              <MIcon name='check-circle' style={styles.iconStyle} />
              <SignInput
                placeholder='Password Confirmation'
                onChangeText={this.onPasswordConfirmChange.bind(this)}
                value={this.props.passwordConfirm}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.separator} />

            <View style={{ marginTop: 10, flexDirection:'row', alignItems:'center'}}>
              <MIcon name='person' style={styles.iconStyle} />
              <SignInput
                placeholder='First Name'
                onChangeText={this.onFirstNameChange.bind(this)}
                value={this.props.firstName}
              />
            </View>
            <View style={styles.separator} />

            <View style={{ marginTop: 10, flexDirection:'row', alignItems:'center'}}>
              <MIcon name='location-city' style={styles.iconStyle} />
              <SignInput
                placeholder='School Name'
                onChangeText={this.onSchoolChange.bind(this)}
                value={this.props.school}
              />
            </View>
            <View style={styles.separator} />

            <View style={{ marginTop: 10, flexDirection:'row', alignItems:'center'}}>
              <MIcon name='school' style={styles.iconStyle} />
              <SignInput
                placeholder='Department'
                onChangeText={this.onDepartmentChange.bind(this)}
                value={this.props.department}
              />
            </View>
            <View style={styles.separator} />

            <View style={{ marginTop: 10, flexDirection:'row', alignItems:'center'}}>
              <MIcon name='thumb-up' style={styles.iconStyle} />
              <SignInput
                placeholder='Referral Code (Optional)'
                onChangeText={this.onReferralChange.bind(this)}
                value={this.props.referral}
              />
            </View>
            <View style={styles.separator} />

            <View style={{ alignItems: 'flex-end', marginTop:5 }}>
              <TouchableOpacity
              onPress={this.onReferralEmailCheck.bind(this)}
              >
                <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                <Text style={{ fontFamily:'Raleway', color: '#f5f5fc', fontSize:13 }}> Referral Code Check </Text>
                <MIcon name='chevron-right' color='#f5f5fc' size={20} />
                </View>
              </TouchableOpacity>
            </View>


            {this.renderSigninButton()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  separator: {
    height: 1,
    backgroundColor: '#dddddd',
    opacity:0.3,
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
  const { email, password, passwordConfirm, firstName, error, loading, referral, school, department } = auth;

  return { email, password, passwordConfirm, firstName, error, loading, referral, school, department };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  passwordConfirmChanged,
  firstNameChanged,
  referralChanged,
  schoolChanged,
  departmentChanged,
  loginUser,
  referralEmailCheck
})(Signup);
