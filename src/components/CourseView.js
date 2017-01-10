import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import Navibar from './common/Navibar';


const GF = require('./GF');

//apply에서 들어왔을 때 처리 네비랑 같이 해줘야됨.
//공부한 거 표시, playstart 에러 여쭤보기
//YellowBox.js:69 You are trying to nest a non-text HTML element inside a text element.

class CourseView extends Component {

  renderTitle() {
    return (
      <Text style={[GF.border('red'), { fontSize: 25, color: '#2e2b4f' }]}>
        {this.props.pastLesson.title}
      </Text>
    );
  }

  renderImage() {
    const { imageStyle } = styles;
    //we are going to take course information not from CourseDetail but from our appState (Courses) since courses were already fetched from the server and they are safely stored.
    //On the otherhand, CourseDetail is a transitioning data, meaning the state of the variable will change with the server response.
    //Thus, due to the metastability issue. we only have to depend on courses.
    console.log(this.props);
    return <Image style={[imageStyle, GF.border('black')]} source={{ uri: this.props.pastLesson.img_url }} />;
  }

  renderNaviBar() {
    return (
      <Navibar
      title='Course'
      />
    );
  }

  renderScore() {
    if(this.props.pastLesson.evaluation_for_tutor.score == 0){
      return(
        <View>
          <Text>Not evaluated yet</Text>
        </View>
      );
    }
    return (
      <View>
        <Text>Score : {this.props.pastLesson.evaluation_for_tutor.score} / {this.props.pastLesson.evaluation_for_tutor.score_max}</Text>
        <Text>Point : {this.props.pastLesson.evaluation_for_tutor.point}</Text>

      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderNaviBar()}


        {this.renderImage()}
        <View style={[{ paddingTop: 10, paddingLeft: 15, paddingRight: 15, paddingBottom: 15,
          backgroundColor: '#f9f9f4', opacity: 1.0, alignItems: 'center' }, GF.border('blue')]}
        >
          {this.renderTitle()}
          {this.renderScore()}
        </View>

      </View>


    );
  }
}

const styles = {
  imageStyle: {

    resizeMode: 'cover',
    backgroundColor: 'rgba(0,0,0,0)',
    width: null,
    height: 200
  }
};

export default CourseView;
