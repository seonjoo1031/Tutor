import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';


const GF = require('./GF');

const width = Dimensions.get('window').width;


class UpcomingLessonListItem extends Component {


//course_id,
  render() {
    const { id, start_time_short, course_title } = this.props.upcomingLesson;
    const { separator, textStyle, titleStyle } = styles;
    return (
      <View>
        <View style={[GF.border('blue'),{ alignItems:'center',paddingTop:10, paddingBottom:10}]}>
          <View style={{ flexDirection: 'row', alignItems:'center' }}>
            <View style={[GF.border('blue'), {width:width*0.12}]}>
              <Text style={textStyle}>{id}</Text>
            </View>
            <View style={[GF.border('blue'), {width:width*0.3, alignItems:'center'}]}>
              <Text style={textStyle}>{start_time_short}</Text>
            </View>
            <View style={[GF.border('blue'), {width:width*0.2, alignItems:'center'}]}>
              <Text style={textStyle}>Seonjoo</Text>
            </View>
            <View style={[GF.border('blue'), {width:width*0.12, alignItems:'center'}]}>
              <Text style={textStyle}>$16</Text>
            </View>
            <View style={[GF.border('blue'), {width:width*0.2, alignItems:'center'}]}>
              <Text style={{fontFamily: 'Avenir',
              fontSize: 13,
              color: '#ffffff',
              alignSelf:'center',
              backgroundColor:'#F16A70'}}> Not paid </Text>
            </View>


           </View>

        </View>
        <View style={separator} />
      </View>
    );
  }
}

// <View style={{flexDirection:'row'}}>
//   <View style={[GF.border('blue'), {width:width*0.12}]} />
//   <View style={[GF.border('blue'), {width:width*0.82}]}>
//    <Text style={[titleStyle,{paddingLeft:10}]}>{course_title}</Text>
//   </View>
// </View>

const styles = {
  textStyle: {
    fontFamily: 'Avenir',
    fontSize: 13,
    color: '#2e2b4f',
    alignSelf:'center'
  },
  titleStyle: {
    fontFamily: 'Avenir',
    fontSize: 12,
    color: '#2e2b4f',
    paddingRight: 10
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
