import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { PreparationOptionButton, Button } from './common';


const GF = require('./GF');

class UpcomingLessonListItem extends Component {

  componentWillMount() {
    this.preparationOptionFunction = this.preparationOptionFunction.bind(this);
  }

  preparationOptionFunction(type) {
    if (type === 'student') {
      Alert.alert(
        'hi',
        null,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]
      );
    }
    else if (type === 'live') {
      console.log(this.props.upcomingLesson);
      Actions.liveLesson({ lessonId: this.props.upcomingLesson.id, user: this.props.user })
    }
  }

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
           <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, padding: 20 }}>
             <PreparationOptionButton
             type='student'
             onPress={this.preparationOptionFunction}
             buttonText='Student Profile'
             />
             <PreparationOptionButton
             type='student'
             onPress={this.preparationOptionFunction}
             buttonText='Request'
             />
             <PreparationOptionButton
             type='live'
             onPress={this.preparationOptionFunction}
             buttonText='Live class'
             />
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

const mapStateToProps = state => {
  const { user } = state.auth;
  return {
    user: user
  };
};

export default connect(mapStateToProps)(UpcomingLessonListItem);
