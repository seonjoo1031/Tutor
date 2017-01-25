import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, ListView, View, StatusBar } from 'react-native';
//import { Actions } from 'react-native-router-flux';
import FCM from 'react-native-fcm';
import { urlForRegisterToken } from '../components/common/ApiUrl'; // 토큰 보내는 쿼리
import { upcomingLessonsFetch, unAssignedLessonsFetch } from '../actions';
import { Spinner, LessonScrollView } from './common';
import LessonScrollContent from './common/LessonScrollContent';
import UnassignedScrollContent from './common/UnassignedScrollContent';
import MainNaviBar from './common/MainNaviBar';

const GF = require('./GF');

class Main extends Component {


  componentWillMount() {
    //this.props.coursesFetch('sungpah@ringleplus.com');
    this.props.upcomingLessonsFetch(this.props.user.email);
    this.props.unAssignedLessonsFetch(this.props.user.email);

    this.createDataSource(this.props);
  }

  componentDidMount() {
    FCM.requestPermissions(); // for iOS
    FCM.getFCMToken().then(token => {
      // store fcm token in your server
      console.log('token!!');
      console.log(token);
      fetch(urlForRegisterToken(), {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.props.user.email,
          registration_token: token
        })
      })
      .then(response => response.json())
      .then(json => console.log(json.response))
      .catch(error =>
        console.log(error)
      )
      .done();
    });

    FCM.getInitialNotification().then(notif => {
      console.log("INITIAL NOTIFICATION", notif)
    });

    this.notificationUnsubscribe = FCM.on("notification", notif => {
      console.log("Notification", notif);

      this.sendRemote(notif);
    });
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  sendRemote(notif) {
    console.log('send remote..', notif);
    console.log('notif body', notif.notification);

    if (notif.notification === undefined) {
        console.log('!!!!!!!');
        return;
    }

    FCM.presentLocalNotification({
      title: notif.notification.body,
      body: notif.notification.body,
      priority: 'high',
      // click_action: notif.fcm.click_action,
      show_in_foreground: true,
      local: true,
      content_available: true,
      // largeIcon: notiIcon,
      vibrate: 300,
      sound: 'default'
    });
  }

  createDataSource({ upcomingLessons, unassignedLessons }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    //what is slice?
    //this.dataSourceRecent = ds.cloneWithRows(courses.slice(0,5));
    this.dataSource = ds.cloneWithRows(upcomingLessons);
    this.dataSourceUnassigned = ds.cloneWithRows(unassignedLessons);
  }

  renderRow(course) {
    return <LessonScrollContent course={course} />;
  }

  renderUnassigned(course) {
    console.log(course);
    return <UnassignedScrollContent course={course} />;
  }

  renderSpinner() {
    if (this.props.loading) {
      return (
        <View style={{ marginTop: 80, flexDirection: 'column', alignItems: 'center' }}>
          <Spinner
          size="large"
          loadingText='교재들을 불러오고 있습니다!'
          />
        </View>
      );
    }
  }

  render() {
    console.log('render');
    console.log(this.props);
    return (
      <View style={[GF.border('red'), { flex: 1, marginBottom: 50 }]}>
        <StatusBar
         backgroundColor="#7a5de8"
         barStyle="default"
        />
        <MainNaviBar />
        <ScrollView style={[GF.border('green'), { flex: 1, backgroundColor: '#f9f9f4' }]}>
          <LessonScrollView
          desc='My'
          renderRow={this.renderRow}
          dataSource={this.dataSource}
          />
          <LessonScrollView
          desc='Unassigned'
          renderRow={this.renderUnassigned}
          dataSource={this.dataSourceUnassigned}
          />
          {this.renderSpinner()}
        </ScrollView>

        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, backgroundColor: '#e3decf' }} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.auth;
  const { upcomingLessons, unassignedLessons, loading } = state.upcomingLessons;
  return {
    user: user,
    upcomingLessons: upcomingLessons, //coursesFetch -> course reducer -> save data to state -> getting this data..?
    unassignedLessons: unassignedLessons,
    loading: loading
  };
};

export default connect(mapStateToProps, { upcomingLessonsFetch, unAssignedLessonsFetch })(Main);
