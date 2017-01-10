import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from './common';


const GF = require('./GF');

class UpcomingLessonListItem extends Component {

  rowPressed() {
    Actions.detailCourseView({ courseId: this.props.upcomingLesson.course_id, upcomingLesson: this.props.upcomingLesson });
  }

  render() {
    const { thumnail, start_time_short, course_title } = this.props.upcomingLesson;
    const { thumb, date, titleTextStyle, separator } = styles;
    return (
      <TouchableHighlight onPress={() => this.rowPressed()} underlayColor='#CCCCF2'>
        <View>
          <View style={{ flexDirection: 'row', padding: 10 }}>
            <Image style={thumb} source={{ uri: thumnail }} />
            <View style={{ flex: 1 }}>
              <Text style={date} numberOfLines={1}>
                {start_time_short}
              </Text>
              <Text style={titleTextStyle} numberOfLines={1}>
                {course_title}
              </Text>
            </View>
           </View>
        <View style={separator} />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = {
  thumb: {
    width: 100,
    height: 50,
    marginRight: 10
  },
  date: {
    fontSize: 15,
    color: '#7a5de8'
  },
  titleTextStyle: {
    fontSize: 12,
    color: '#2e2b4f'
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  }
};


export default UpcomingLessonListItem;
