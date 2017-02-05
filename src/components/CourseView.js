import React, { Component } from 'react';
import { Text, View, Image, TouchableHighlight } from 'react-native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import SLIcon from 'react-native-vector-icons/SimpleLineIcons';
import { Actions } from 'react-native-router-flux';
import Navibar from './common/Navibar';


const GF = require('./GF');

//apply에서 들어왔을 때 처리 네비랑 같이 해줘야됨.
//공부한 거 표시, playstart 에러 여쭤보기
//YellowBox.js:69 You are trying to nest a non-text HTML element inside a text element.

class CourseView extends Component {

  renderTitle() {
    return (
      <View style={{padding:10, backgroundColor: '#f9f9f4', alignItems: 'center'}}>
      <Text style={[GF.border('red'), { fontSize: 20, color: '#2e2b4f', fontFamily: 'Raleway' }]}>
        {this.props.pastLesson.title}
      </Text>
      </View>
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
      title='Past Lesson'
      />
    );
  }

  renderFeedback() {
    if(this.props.pastLesson.feedback_exist){
      return(
      <Text style={{fontFamily: 'Raleway', color:'#7a5de8'}}>Done</Text>
    );
    }
    return(
      <Text style={{fontFamily: 'Raleway', color:'#7a5de8'}}>Need to wrtie</Text>
    );
  }

  renderScore() {
    if(this.props.pastLesson.evaluation_for_tutor.score == 0){
      return(
        <View style={{alignItems: 'center', paddingTop:10}}>
          <EvilIcon name='exclamation' size={45} color='#7a5de8' />
          <Text style={{fontFamily: 'Raleway', color:'#2e2b4f', fontSize:15, paddingTop:5}}>Not evaluated yet</Text>
        </View>
      );
    }
    return (
      <View style={{justifyContent:'flex-start', width:300}}>
      <View>
        <View>
          <View style={styles.rowStyle}>
            <EvilIcon name='user' style={styles.iconStyle} />
            <View style={styles.nameStyle}>
            <Text style={{fontFamily: 'Raleway', color:'#2e2b4f', fontSize:12, letterSpacing:1}}>STUDENT</Text>
            </View>
            <View style={{paddingLeft:10}}>
              <Text style={{fontFamily: 'Raleway', color:'#2e2b4f'}}>{this.props.pastLesson.student_first_name} {this.props.pastLesson.student_last_name} </Text>
            </View>
          </View>
          <View style={styles.separator} />

          <View style={styles.rowStyle}>
            <EvilIcon name='like' style={styles.iconStyle} />
            <View style={styles.nameStyle}>
            <Text style={{fontFamily: 'Raleway', color:'#2e2b4f', fontSize:12, letterSpacing:1}}>SCORE</Text>
            </View>
            <View style={{paddingLeft:10}}>
              <Text style={{fontFamily: 'Raleway', color:'#2e2b4f'}}>{this.props.pastLesson.evaluation_for_tutor.score} / {this.props.pastLesson.evaluation_for_tutor.score_max}</Text>
            </View>
          </View>
          <View style={styles.separator} />

          <View style={styles.rowStyle}>
            <EvilIcon name='heart' style={styles.iconStyle} />
            <View style={styles.nameStyle}>
            <Text style={{fontFamily: 'Raleway', color:'#2e2b4f', fontSize:12, letterSpacing:1}}>POINT</Text>
            </View>
            <View style={{paddingLeft:10}}>
              <Text style={{fontFamily: 'Raleway', color:'#2e2b4f'}}>{this.props.pastLesson.evaluation_for_tutor.point}</Text>
            </View>
          </View>
          <View style={styles.separator} />

          <View style={styles.rowStyle}>
            <EvilIcon name='envelope' style={styles.iconStyle} />
            <View style={styles.nameStyle}>
            <Text style={{fontFamily: 'Raleway', color:'#2e2b4f', fontSize:12, letterSpacing:1}}>FEEDBACK</Text>
            </View>
            <View style={{paddingLeft:10}}>
              {this.renderFeedback()}
            </View>
          </View>
          <View style={styles.separator} />

          <TouchableHighlight
          onPress={() => Actions.renderWebView({ url: this.props.pastLesson.web_view_link, fromWhere: 'googleDocs' })}
          underlayColor='#CCCCF2'
          >
            <View style={[styles.rowStyle, {width:300}]}>
              <EvilIcon name='external-link' style={styles.iconStyle} />
              <View style={{justifyContent:'space-between', flexDirection:'row', flex:1}}>
              <Text style={{fontFamily: 'Raleway', color:'#2e2b4f', fontSize:12, letterSpacing:1}}>GOOGLE DOCS</Text>
              <EvilIcon name='chevron-right' style={{fontSize: 24, color: '#7a5de8'}} />
              </View>
            </View>
          </TouchableHighlight>

        </View>
      </View>
      </View>
    );
  }

  //<View style={{height:1, width:300, backgroundColor: '#dddddd'}} />


  render() {
    return (
      <View style={{ flex: 1 }}>


        {this.renderNaviBar()}
        {this.renderImage()}
        {this.renderTitle()}

        <View style={{height:1, backgroundColor: '#dddddd'}} />


        <View style={[{ paddingLeft: 15, paddingRight: 15, paddingBottom: 15,
          backgroundColor: '#f9f9f4', flex:1, alignItems: 'center' }, GF.border('blue')]}
        >
          {this.renderScore()}
        </View>

      </View>


    );
  }
}

const styles = {
  separator: {
    height:1, width:300, backgroundColor: '#dddddd'
  },
  rowStyle: {
    flexDirection:'row', paddingTop:10, paddingBottom:10, alignItems:'center'
  },
  iconStyle: {
    fontSize: 24,
    color: '#7a5de8',
    opacity:0.8,
    paddingRight: 7
  },
  nameStyle: {
    width: 100,

  },
  textStyle: {
    fontFamily: 'Raleway',
    color: '#2e2b4f'
  },
  imageStyle: {
    resizeMode: 'cover',
    backgroundColor: 'rgba(0,0,0,0)',
    width: null,
    height: 200
  }
};

export default CourseView;
