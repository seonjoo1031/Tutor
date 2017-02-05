import React, { Component } from 'react';
import { View, ScrollView, ListView, Text } from 'react-native';
import { connect } from 'react-redux';
import { upcomingLessonsFetch } from '../actions';
import { Spinner } from './common';
import UpcomingLessonListItem from './UpcomingLessonListItem';
import TabNaviBar from './common/TabNaviBar';


const GF = require('./GF');

class UpcomingLessons extends Component {

  componentWillMount() {
    console.log(this.props);
    this.props.upcomingLessonsFetch(this.props.user.token);
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.createDataSource(nextProps);
  }

  createDataSource({ upcomingLessons }) {
    console.log(upcomingLessons);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(upcomingLessons);
  }

  listViewForUpcomingClass() {
    if (this.props.upcomingLessons !== null) {
      if (this.props.upcomingLessons.length === 0) {
        return (<View style={{ alignItems: 'center', marginTop: 15 }}>
          <Text style={{ fontSize: 15, color: '#897FA6', fontFamily:'Raleway' }}>No upcoming lesson.</Text>
        </View>);
      } else {
        return (
          <View>
            <ListView
              dataSource={this.dataSource}
              renderRow={this.renderRow}
              enableEmptySections
            />
          </View>
        );
      }
    } else {
      return (
        <View />
      );
    }
  }

  renderSpinner() {
    if (this.props.loading) {
      return (
        <View style={{ marginTop: 80, flexDirection: 'column', alignItems: 'center' }}>
          <Spinner size="large" />
        </View>
      );
    }
  }

  renderRow(upcomingLesson) {
    return <UpcomingLessonListItem upcomingLesson={upcomingLesson} />;
  }

  render() {
    return (
      <View style={{ flex: 1, marginBottom: 50, backgroundColor: '#f9f9f4' }}>
        <TabNaviBar title='Upcoming Lessons'/>
        <ScrollView style={{ flex: 1 }}>
          <View>
            {this.listViewForUpcomingClass()}
            {this.renderSpinner()}
          </View>

        </ScrollView>
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, backgroundColor: '#e3decf' }} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.auth;
  const { upcomingLessons, loading } = state.upcomingLessons;
  return {
    user: user,
    upcomingLessons: upcomingLessons,
    loading: loading
  };
};

export default connect(mapStateToProps, { upcomingLessonsFetch })(UpcomingLessons);
