import React, { Component } from 'react';
import { View, ScrollView, Linking, AsyncStorage, Alert, Text, Switch } from 'react-native';
import { connect } from 'react-redux';
import { FBLoginManager } from 'react-native-facebook-login';
import { GoogleSignin } from 'react-native-google-signin';
import { Actions } from 'react-native-router-flux';
import { ringleEmailToggle } from '../actions';
import { MySettingCard } from './common';
import TabNaviBar from './common/TabNaviBar';


class MySetting extends Component {

  componentWillMount() {
    this.constructEmailCheckerState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.constructEmailCheckerState(nextProps);
  }

  onNamePressed() {
  }

  onEmailPressed() {
  }

  onPressedChat() {
    //Actions.renderWebView({ url: 'http://plus.kakao.com/home/@ringle' });


    console.log('going to chat with admin page.');
    const url = 'http://plus.kakao.com/home/@ringle'
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  onPressedTimezone() {
    alert('Timezone변경은 현재 데스크탑으로 가능하십니다.');
  }

  //logout
  onPressedLogoutIcon() {
    Alert.alert(
      '로그아웃 하시겠습니까?',
      null,
      [
        { text: '아니오', onPress: () => ('login cancel') },
        { text: '네', onPress: () => this.onPressedLogout() },
      ]
    );
  }

  onPressedLogout() {
    AsyncStorage.getItem('login_channel').then((loginType) => {
      console.log(loginType);
      switch (loginType) {
        case 'email':
          break;
        case 'facebook':
        FBLoginManager.logout((error, data) => {
          if (!error) {
            console.log('successfully logged out..');
          } else {
            console.log(error, data);
          }
        });
          break;
        case 'google':
        GoogleSignin.signOut()
        .then(() => {
          console.log('successfully logged out..');
        })
        .catch((error) => {
          console.log(error);
        });
          break;

        default:
          break;
        }
      }).done;
    AsyncStorage.setItem('signin', 'off');
    AsyncStorage.multiRemove(['login_channel', 'email', 'password', 'signin']);
    console.log(AsyncStorage.getAllKeys());
    Actions.auth();
  }

  constructEmailCheckerState({ringleEmails, ringleEmailCheckers}){
    console.log('이부분이 실행이 될 때, ringleEmailChecker가 존재하나?');
    console.log(ringleEmails);
    var array = [];
    if (ringleEmails != null){
      ringleEmails.forEach((val,i) => {
        const ringleEmailChecker = ringleEmailCheckers.find(x => x.ringle_email_id === val.id);
        if (ringleEmailChecker != null){
          array.push(
            { ringle_email_id: val.id, receive: ringleEmailChecker.receive}
          )
        }else{
          array.push(
            { ringle_email_id: val.id, receive: true}
          )
        }
      });
    }
    this.setState({
      checker_array: array,
    });
  }
  updateCheckerArray(id){
    const ringleEmailChecker_selected = this.state.checker_array.find(x => x.ringle_email_id ===id);
    console.log('빨리~~');
    var array = this.state.checker_array;
    array.forEach((val,i)=>{
      if (val.ringle_email_id === id){
        val.receive = !val.receive;
      }
    });
    this.setState({
      checker_array: array,
    });
  }

  renderEmailChecker(){
    const {email} = this.props.user;

    var email_checker_final_array = [];
    console.log(this.props.ringleEmailCheckers);
    if (this.props.ringleEmails != null){
      this.props.ringleEmails.forEach((val,i) => {
        console.log('data....');
        const ringleEmailChecker = this.state.checker_array.find(x => x.ringle_email_id === val.id);
        var bool = true;
        if (ringleEmailChecker){
          bool = ringleEmailChecker.receive;
        }
          email_checker_final_array.push(
            <View key={i} style={{paddingLeft:20,paddingRight:20, marginTop: 10,
              flexDirection:'row', justifyContent:'space-between'
            }}>
              <Text style={{ color: '#2e2b4f' }}>{val.description}</Text>
              <Switch
                value={bool}
                onValueChange={() =>{
                  this.updateCheckerArray(val.id);
                  this.props.ringleEmailToggle(val.id,email);
                  }
                }
              />
            </View>
          );
      });
    }

    return(
      <View>
        {email_checker_final_array}
      </View>
    );
  }

  render() {
    const { email, first_name, last_name, timezone, property_1 } = this.props.user;

    return (
      <View style={{ marginBottom: 50, flex: 1, backgroundColor: '#f9f9f4' }}>
        <TabNaviBar />
        <ScrollView style={{ flex: 1, marginTop: 20, backgroundColor: '#f9f9f4' }}>
          <View>
            <MySettingCard onPress={this.onNamePressed.bind(this)} label="Name" content={`${first_name},${last_name}`}/>
            <MySettingCard onPress={this.onEmailPressed.bind(this)} label="Email" content={email}/>
            <MySettingCard onPress={this.onPressedChat.bind(this)} label="링글에게 물어보세요!" content=">"/>
            <MySettingCard onPress={this.onPressedTimezone.bind(this)} label="Timezone" content={timezone}/>
            <MySettingCard onPress={console.log('update info')} label="Update Info" content='v.1.0.0'/>
            <MySettingCard onPress={this.onPressedLogoutIcon.bind(this)} label="Logout" content=""/>
            {this.renderEmailChecker()}
          </View>

        </ScrollView>
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, backgroundColor: '#e3decf' }} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { user, ringleEmails, ringleEmailCheckers } = state.auth;

  return {
    user: user,
    ringleEmails: ringleEmails,
    ringleEmailCheckers: ringleEmailCheckers,
  };
};

export default connect(mapStateToProps, { ringleEmailToggle })(MySetting);
