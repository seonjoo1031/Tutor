import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image, Alert, TouchableOpacity } from 'react-native';
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
    const { thumb, date, titleTextStyle, separator, textStyle, buttonStyle } = styles;
    return (
      <TouchableHighlight onPress={() => this.rowPressed()} underlayColor='#CCCCF2'>
        <View style={{paddingTop: 5}}>
          <View style={{ flexDirection: 'row', padding: 10 }}>
            <Image style={thumb} source={{ uri: thumnail }} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={date} numberOfLines={1}>
                {start_time_short}
              </Text>
              <Text style={titleTextStyle} numberOfLines={1}>
                {course_title}
              </Text>
            </View>
           </View>
           <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems:'center', paddingTop:2, paddingBottom:10 }}>
             <PreparationOptionButton
             type='student'
             onPress={this.preparationOptionFunction}
             buttonText='Student Info'
             />
             <PreparationOptionButton
             type='student'
             onPress={this.preparationOptionFunction}
             buttonText='Request'
             />

             <TouchableOpacity onPress={()=>this.preparationOptionFunction('live')} style={buttonStyle}>
               <Text style={textStyle}>
                 Enter Class
               </Text>
             </TouchableOpacity>
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
    marginLeft: 5,
    marginRight: 10
  },
  date: {
    fontFamily: 'Avenir',
    fontSize: 15,
    color: '#7a5de8'
  },
  titleTextStyle: {
    fontFamily: 'Avenir',
    fontSize: 12,
    color: '#2e2b4f'
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  textStyle: {
    alignSelf: 'center',
    color: '#ffffff',
    fontFamily: 'Avenir-Heavy'
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7a5de8',
    borderRadius: 8,
    height: 33,
    width: 100,
    marginLeft: 8, marginRight: 8
  }
};

const mapStateToProps = state => {
  const { user } = state.auth;
  return {
    user: user
  };
};

export default connect(mapStateToProps)(UpcomingLessonListItem);
