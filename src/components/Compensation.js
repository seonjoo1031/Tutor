import React, { Component } from 'react';
import { View, ScrollView, ListView, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import { upcomingLessonsFetch } from '../actions';
import { Spinner } from './common';
import CompensationList from './CompensationList';
import NaviBar from './common/Navibar';


const GF = require('./GF');

const width = Dimensions.get('window').width;


class Compensation extends Component {

  componentWillMount() {
    console.log(this.props);
    this.props.upcomingLessonsFetch(this.props.user.email);
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
          <Text style={{ fontSize: 15, color: '#897FA6' }}>No upcoming lesson.</Text>
        </View>);
      } else {
        return (
          <View style={{paddingTop:10}}>
          <View style={{flexDirection:'row', alignItems:'center', marginBottom:5}}>
            <View style={{width:width*0.5, borderRightWidth:1, borderColor:'#e3decf'}}>
              <Text style={{fontFamily:'Avenir', alignSelf:'center', fontSize:12, color:'#2e2b4f'}}>Class for Compensation</Text>
              <Text style={{alignSelf:'center', fontFamily: 'Avenir', fontSize: 23, color: '#7a5de8'}}>{this.props.upcomingLessons.length}</Text>
            </View>
            <View style={{width:width*0.5}}>
              <Text style={[styles.textStyle, {alignSelf:'center'}]}>Total $</Text>
              <Text style={{alignSelf:'center', fontFamily: 'Avenir', fontSize: 22, color: '#7a5de8'}}>$48</Text>
            </View>
          </View>
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
    return <CompensationList upcomingLesson={upcomingLesson} />;
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f9f9f4' }}>
        <NaviBar title='My Compensation'/>
        <ScrollView style={{ flex: 1 }}>
          <View>
            {this.listViewForUpcomingClass()}
            {this.renderSpinner()}
          </View>

        </ScrollView>
      </View>
    );
  }
}

const styles = {

  textStyle: {
    fontFamily: 'Avenir',
    fontSize: 13,
    color: '#2e2b4f'
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

export default connect(mapStateToProps, { upcomingLessonsFetch })(Compensation);
