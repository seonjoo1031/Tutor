import React, { Component } from 'react';
import { View, ScrollView, ListView, Text, TouchableHighlight, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { pastLessonsFetch } from '../actions';
import PastLessonListItem from './PastLessonListItem';
import { Spinner } from './common';
import TabNaviBar from './common/TabNaviBar';
import MIcon from 'react-native-vector-icons/MaterialIcons';


const GF = require('./GF');

//back key에서 tempData와 page리셋 해줘야함.
var tempData = null;
var page = 1;
const width = Dimensions.get('window').width;


class PastLessons extends Component {
  state = { page: 1 };
  componentWillMount() {
    console.log(this.props);
    this.props.pastLessonsFetch(this.props.user.token, page);
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ pastLessonsListings }) {
    var morePastLessonsData = null;
    if (page > 1) {
      morePastLessonsData = tempData;
      tempData = morePastLessonsData.concat(pastLessonsListings);
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      this.dataSource = ds.cloneWithRows(tempData);
    } else {
      tempData = pastLessonsListings;
      console.log(tempData);
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      this.dataSource = ds.cloneWithRows(pastLessonsListings);
    }
  }

  pastClassesListView() {
    if (this.props.pastLessons.total_class_num > 0) {
      if (this.dataSource === [] || this.dataSource === null) {
        return (
          <View />
          );
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

  pastClasses() {
    if (this.props.pastLessons.total_class_num > 9) {
      return (
        <TouchableHighlight onPress={() => this.renderSeeMoreClasses()}
          underlayColor='#CCCCF2'
          style={[styles.button_default, styles.button_select]}
        >
          {this.renderSeeMoreButton()}
        </TouchableHighlight>
        );
    } else {
      if(this.props.pastLessons.total_class_num > 0) {
        return (
          <View />
        );
      } else {
        return (
          <View />
          );
      }
    }
  }

  renderSpinner() {
    if (this.props.loading) {
      return (
        <View style={{ marginTop: 80, flexDirection: 'column', alignItems: 'center' }}>
          <Spinner
          size="large"
          loadingText='Loading lessons..'
          />
        </View>
      );
    }
  }

  renderSeeMoreClasses() {
    page++;
    this.props.pastLessonsFetch(this.props.user.token, page);
    this.createDataSource(this.props);
  }

  //스피너 처리 해줘야됨
  renderSeeMoreButton() {
    return (
      <Text style={[styles.white_text]}> View more </Text>
    );
  }

  renderRow(pastLessonItem) {
    return <PastLessonListItem pastLessonItem={pastLessonItem} />;
  }


  render() {
    console.log(this.props);
    const { pastLessonsContainerStyle } = styles;
    return (
      <View style={pastLessonsContainerStyle}>
        <TabNaviBar title='Past Lessons' />
        <ScrollView style={[GF.border('red'), { flex: 1, marginTop: 20 }]}>
          <View style={[GF.border('black'), { alignItems: 'center', paddingBottom: 5 }]}>
            <Text style={{ color: '#2e2b4f', fontFamily: 'Raleway', fontSize:15}}>Your Total Lessons</Text>

            <Text style={{ fontSize: 25, color: '#7a5de8', fontFamily: 'Raleway', paddingTop:5 }}>{this.props.pastLessons.total_class_num}</Text>
          </View>

          <View style={{alignItems:'center'}}>
            <MIcon name='more-horiz' size={30} color='#7a5de8' style={{opacity:0.4}} />
          </View>

          <View>
            {this.pastClassesListView()}
            {this.pastClasses()}
          </View>
          {this.renderSpinner()}
        </ScrollView>
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, backgroundColor: '#e3decf' }} />
      </View>
    );
  }
}

const styles = {
  pastLessonsContainerStyle: {
    marginBottom: 50,
    flex: 1,
    backgroundColor: '#f9f9f4'
  },
  button_default: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    paddingLeft: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  button_select: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#7a5de8',
  },
  white_text: {
    color: '#7a5de8',
    textAlign: 'center',
    fontFamily:'Raleway',
    fontSize: 15
  },
  separator: {
    height: 1,
    backgroundColor: '#7a5de8',
    opacity:0.5,
    width:width*0.3
  }
};

const mapStateToProps = state => {
  const { user } = state.auth;
  const { pastLessons, pastLessonsListings, loading } = state.pastLessons;
  return {
    user: user,
    pastLessons: pastLessons,
    pastLessonsListings: pastLessonsListings,
    loading: loading
  };
};

export default connect(mapStateToProps, { pastLessonsFetch })(PastLessons);
