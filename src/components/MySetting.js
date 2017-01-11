import React, { Component } from 'react';
import { View, ScrollView, Linking, AsyncStorage, Alert } from 'react-native';
import { FBLoginManager } from 'react-native-facebook-login';
import { Actions } from 'react-native-router-flux';
import { MySettingCard } from './common';
import TabNaviBar from './common/TabNaviBar';


class MySetting extends Component {
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
        // case 'google':
        // GoogleSignin.signOut()
        // .then(() => {
        //   console.log('successfully logged out..');
        // })
        // .catch((error) => {
        //   console.log(error);
        // });
        //   break;

        default:
          break;
        }
      }).done;
    AsyncStorage.setItem('signin', 'off');
    AsyncStorage.multiRemove(['login_channel', 'email', 'password', 'signin']);
    console.log(AsyncStorage.getAllKeys());
    Actions.auth();
  }

  render() {
    return (
      <View style={{ marginBottom: 50, flex: 1, backgroundColor: '#f9f9f4' }}>
        <TabNaviBar />
        <ScrollView style={{ flex: 1, marginTop: 20, backgroundColor: '#f9f9f4' }}>
          <View>
            <MySettingCard onPress={this.onNamePressed.bind(this)} label="Name" content='name'/>
            <MySettingCard onPress={this.onEmailPressed.bind(this)} label="Email" content='email'/>
            <MySettingCard onPress={this.onPressedChat.bind(this)} label="링글에게 물어보세요!" content=">"/>
            <MySettingCard onPress={this.onPressedTimezone.bind(this)} label="Timezone" content='timezone'/>
            <MySettingCard onPress={console.log('update info')} label="Update Info" content='v.1.0.0'/>
            <MySettingCard onPress={this.onPressedLogoutIcon.bind(this)} label="Logout" content=""/>

          </View>

        </ScrollView>
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, backgroundColor: '#e3decf' }} />
      </View>
    );
  }
}

export default MySetting;
