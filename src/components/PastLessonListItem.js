import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Spinner } from './common';

const GF = require('./GF');

class PastLessonListItem extends Component {
  rowPressed() {
    console.log(this.props.pastLessonItem);
    Actions.courseView({ pastLesson: this.props.pastLessonItem });
  }

  render() {
    const { img_url, start_time, title } = this.props.pastLessonItem;
    const { thumb, date, titleTextStyle, separator } = styles;
    return (
      <TouchableHighlight onPress={() => this.rowPressed()} underlayColor='#CCCCF2'>
        <View>
          <View style={{ flexDirection: 'row', padding: 10 }}>
            <Image style={thumb} source={{ uri: img_url }} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={date} numberOfLines={1}>
                {start_time}
              </Text>
              <Text style={titleTextStyle} numberOfLines={1}>
                {title}
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
    fontFamily: 'Raleway',
    fontSize: 15,
    color: '#7a5de8'
  },
  titleTextStyle: {
    fontFamily: 'Raleway',
    fontSize: 12,
    color: '#2e2b4f'
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  }
};

export default PastLessonListItem;
