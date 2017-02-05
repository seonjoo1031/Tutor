import React, { Component } from 'react';
import { View, ScrollView, Linking, AsyncStorage, Alert, Text, Switch } from 'react-native';
import { connect } from 'react-redux';
import { FBLoginManager } from 'react-native-facebook-login';
import { GoogleSignin } from 'react-native-google-signin';
import { Actions } from 'react-native-router-flux';
import { pushToggle, emailToggle } from '../actions';
import { MySettingCard, MySettingButton } from './common';
import TabNaviBar from './common/TabNaviBar';
import MIcon from 'react-native-vector-icons/MaterialIcons';


class MySetting extends Component {

  state = {
    pushIsOn:null,
    emailIsOn:null
  }

  componentWillMount() {

    console.log(this.props);

    const {boolean_email_notification, boolean_push_notification} = this.props.user;

    var push_bool, email_bool;
    if(boolean_push_notification === null || boolean_push_notification){
      push_bool=true;
    }
    else{
      push_bool=false;
    }

    if(boolean_email_notification === null || boolean_email_notification){
      email_bool=true;
    }
    else{
      email_bool=false;
    }


    this.setState({
      pushIsOn:push_bool,
      emailIsOn:email_bool
    });
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

  //logout
  onPressedLogoutIcon() {
    Alert.alert(
      'Logout',
      'Do you want to logout?',
      [
        { text: 'Yes', onPress: () => this.onPressedLogout() },
        { text: 'No', onPress: () => ('login cancel') }

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


  renderChecker() {
    const {token, id} = this.props.user;


    return(
      <View style={{marginTop:10}}>

        <View
        style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems:'center',
        paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10 }}
        >
          <View style={{flexDirection:'row'}}>
            <MIcon name='phonelink-ring' size={20} color='#7a5de8' style={{opacity:0.7}} />
            <Text style={{ paddingLeft:10, color: '#897FA6', fontFamily: 'Raleway', fontSize:13 }}>Push Notification</Text>
          </View>
          <Switch
            value={this.state.pushIsOn}
            onValueChange={(value) =>{
              console.log(value);
              this.setState({pushIsOn: value});
              this.props.pushToggle(value, token);
              }
            }
          />
        </View>

        <View
        style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems:'center',
        paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10 }}
        >
          <View style={{flexDirection:'row'}}>
            <MIcon name='email' size={20} color='#7a5de8' style={{opacity:0.7}} />
            <Text style={{ paddingLeft:10, color: '#897FA6', fontFamily: 'Raleway', fontSize:13 }}>Email Notification</Text>
          </View>
          <Switch
            value={this.state.emailIsOn}
            onValueChange={(value) =>{
              this.setState({emailIsOn: value});
              this.props.emailToggle(value, token);
              }
            }
          />
        </View>


      </View>
    );

  }

  render() {
    const { email, first_name, last_name, timezone } = this.props.user;
    return (
      <View style={{ marginBottom: 50, flex: 1, backgroundColor: '#f9f9f4' }}>
        <TabNaviBar title='My Setting' />
        <ScrollView style={{ flex: 1, marginTop: 20, backgroundColor: '#f9f9f4' }}>
          <View>
            <MySettingCard icon='person' label="Name" content={`${first_name} ${last_name}`}/>
            <MySettingCard icon='email' label="Email" content={email}/>
            <MySettingCard icon='location-on' label="Timezone" content={timezone}/>
            <MySettingCard icon='info' label="Update Info" content='v.1.0.0'/>
            <MySettingButton onPress={()=>Actions.compensation()} icon='attach-money' label="My Compensation" content=""/>
            <MySettingButton onPress={this.onPressedChat.bind(this)} icon='help-outline' label="Contact us" content=""/>
            <MySettingButton onPress={this.onPressedLogoutIcon.bind(this)} icon='exit-to-app' label="Logout" content=""/>

            {this.renderChecker()}
          </View>

        </ScrollView>
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, backgroundColor: '#e3decf' }} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.auth;

  return {
    user: user
  };
};

export default connect(mapStateToProps, { pushToggle, emailToggle })(MySetting);
