import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, ListView, View, StatusBar } from 'react-native';
//import { Actions } from 'react-native-router-flux';
//import FCM from 'react-native-fcm';
//import { urlForRegisterToken } from '../components/common/ApiUrl'; // 토큰 보내는 쿼리
import { upcomingLessonsFetch, unAssignedLessonsFetch } from '../actions';
import { Spinner, LessonScrollView } from './common';
import LessonScrollContent from './common/LessonScrollContent';
import UnassignedScrollContent from './common/UnassignedScrollContent';
import TabNaviBar from './common/TabNaviBar';

const GF = require('./GF');

class Main extends Component {


  componentWillMount() {
    //this.props.coursesFetch('sungpah@ringleplus.com');
    this.props.upcomingLessonsFetch('sungpah@ringleplus.com');
    this.props.unAssignedLessonsFetch('sungpah@ringleplus.com');

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
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
        <TabNaviBar />
        <ScrollView style={[GF.border('green'), { flex: 1, backgroundColor: '#f9f9f4', paddingTop: 10 }]}>
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
  const { upcomingLessons, unassignedLessons, loading } = state.upcomingLessons;
  return {
    upcomingLessons: upcomingLessons, //coursesFetch -> course reducer -> save data to state -> getting this data..?
    unassignedLessons: unassignedLessons,
    loading: loading
  };
};

export default connect(mapStateToProps, { upcomingLessonsFetch, unAssignedLessonsFetch })(Main);
