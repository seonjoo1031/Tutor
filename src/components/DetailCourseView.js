import React, { Component } from 'react';
import { Text, View, ScrollView, Image, Alert,
  TouchableHighlight, Linking, Platform, Slider, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import HTML from './react-native-fence-html';
import { LessonContentButton, Spinner } from './common';
import { detailCourseFetch } from '../actions';
import CourseViewNaviBar from './CourseViewNaviBar';

const GF = require('./GF');

//apply에서 들어왔을 때 처리 네비랑 같이 해줘야됨.
//공부한 거 표시, playstart 에러 여쭤보기
//YellowBox.js:69 You are trying to nest a non-text HTML element inside a text element.

class CourseView extends Component {
  constructor(props) {
    super(props);
    this.pressedLessonContent = this.pressedLessonContent.bind(this);
  }

  state = {
    currentTime: 0,
    contentHeight: null,
    readState: false,
    tabBarShow: false,
    opacity: 0,
    playing: false,
    sliding: false,
    songDuration: null,
    isFirstPlay: true,
    flag: false,
  };

  componentWillMount() {
    this.props.detailCourseFetch(this.props.courseId);
  }

  setScrollViewHeight(h) {
    this.setState({ contentHeight: h });
  }

  handleScroll(contentOffset) {
    if (contentOffset.y > 250) {
      this.setState({ opacity: 1 });
    } else if (contentOffset.y < 1) {
      this.setState({ opacity: 0 });
    } else {
      this.setState({ opacity: 1 - (250-contentOffset.y) / 250 });
    }

    if (this.state.readState) {
      //do nothing.
    } else {
      //prestudy id might not exist.
      if (contentOffset.y > this.state.contentHeight / 3) {
        this.setState({ readState: true, tabBarShow: true });
      }
    }
  }


  pressedCourseDown(url) {
    if (url === 'N/A' || url === '') {
      console.log('nothing to open');
    } else {
      Alert.alert(
        '교재 다운받기',
        '다운 받으시겠습니까?',
        [
          { text: 'OK', onPress: () => {
            Linking.canOpenURL(url).then(supported => {
            if (!supported) {
              console.log('Can\'t handle url: ' + url);
            } else {
              return Linking.openURL(url);
            }
          }).catch(err => console.error('An error occurred', err));
        } },
          { text: 'CANCEL', onPress: () => console.log('download cancel')}
        ]
      );
    }
  }

  // 예습에서는 이 함수가 호출되지 않아요!
  pressedLessonContent(contentType) {
    switch (contentType) {
      case 'question':
        Actions.keyQuestions({
          lesson: this.props.detailCourse });
        break;
      case 'video':
        Actions.extraContents({ contentType: 'youtube', lesson: this.props.detailCourse });
        break;
      case 'article':
        Actions.extraContents({ contentType: 'article', lesson: this.props.detailCourse });
        break;
      case 'coursedown':
        this.pressedCourseDown(this.props.detailCourse.course_pdf_url);
        break;
      default:
        break;
    }
  }


  renderCourseContentButton() {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20, marginBottom: 10, backgroundColor: '#f9f9f4' }}>
        <LessonContentButton
        onPress={this.pressedLessonContent}
        textType='QUESTIONS'
        contentType='question'
        />
        <LessonContentButton
        onPress={this.pressedLessonContent}
        textType='YOUTUBE'
        contentType='video'
        />
        <LessonContentButton
        onPress={this.pressedLessonContent}
        textType='ARTICLE'
        contentType='article'
        />
        <LessonContentButton
        onPress={this.pressedLessonContent}
        textType='RingleBook'
        contentType='coursedown'
        />
        </View>
      );
  }

  renderSummary() {
    console.log('summary');
    console.log(this.props.detailCourse.course_id);
    console.log(this.props.courseId);

    console.log(this.props.detailCourse.course_id === this.props.courseId);

    if (this.props.detailCourse.course_id === this.props.courseId) {
      if (this.props.detailCourse.length === 0) {
        return (
          <View style={{ flex: 1, backgroundColor: '#f9f9f4', alignItems: 'center' }}>
          <Text style={{ color: '#2e2b4f', fontSize: 25 }}> Summary가{'\n'}없습니다. </Text>
          </View>
        );
      } else {
        //console.log(this.props);
        const html = '<p>Will be prepared soon.</p>'
        //when switching from the previous course, detailCourse file still exists and it will be overridden by a new fetching request.
        //The problematic side of this implementation is long length of summary of the previous course will be rendered first and new summary will be re-rendered,
        //meaning data rendering will take 2 times of effort than fectching one course from the server.
        if (this.props.detailCourse.summary_eng === '' || this.props.detailCourse.summary_eng === null) {
          return (
            <View style={{ backgroundColor: '#f9f9f4' }}>
              <HTML
              html={html}
              htmlStyles={htmlStyles}
              />
            </View>
          );
        } else {
          return (
            <View style={[GF.border('coral'), { backgroundColor: '#f9f9f4' }]}>
              <HTML
              html={this.props.detailCourse.summary_eng}
              htmlStyles={htmlStyles}
              />
              <View style={styles.separator} />
            </View>
          );
        }
      }
    } else{
      return <View />;
    }
  }


  renderNaviBar() {
    return (
      <CourseViewNaviBar
      opacity={this.state.opacity}
      title={this.props.detailCourse.title}
      />
    );
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


  renderTitle() {
    return (
        <Text style={[GF.border('red'), { fontSize: 25, color: '#2e2b4f' }]}>
          {this.props.upcomingLesson.course_title}
        </Text>
    );
  }

  renderImage() {
    const { imageStyle } = styles;
    //we are going to take course information not from CourseDetail but from our appState (Courses) since courses were already fetched from the server and they are safely stored.
    //On the otherhand, CourseDetail is a transitioning data, meaning the state of the variable will change with the server response.
    //Thus, due to the metastability issue. we only have to depend on courses.
    console.log(this.props);
    return <Image style={[imageStyle, GF.border('black')]} source={{ uri: this.props.upcomingLesson.thumnail }} />;
  }

  render() {

    return (
      <View style={{ flex: 1 }}>
        <ScrollView
        onScroll={ev => this.handleScroll(ev.nativeEvent.contentOffset)}
        scrollEventThrottle={32}
        onContentSizeChange={(w, h) => this.setScrollViewHeight(h)}
        >
          {this.renderImage()}
          <View style={[{ paddingTop: 10, paddingLeft: 15, paddingRight: 15, paddingBottom: 15,
            backgroundColor: '#f9f9f4', opacity: 1.0, alignItems: 'center' }, GF.border('blue')]}
          >
            {this.renderTitle()}
          </View>

          <View style={[GF.border('yellow'), { backgroundColor: '#f9f9f4' }]}>
            {this.renderCourseContentButton()}
            {this.renderSpinner()}
          </View>
          <View style={{ paddingLeft: 10, backgroundColor: '#f9f9f4' }}>
            <Text style={{ fontSize: 20, paddingTop: 30, color: '#2e2b4f' }}>Ringle Insight</Text>
          </View>
          {this.renderSummary()}
        </ScrollView>
        {this.renderNaviBar()}

      </View>
    );
  }
}

const styles = {
  imageStyle: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: 'rgba(0,0,0,0)',
    width: null,
    height: 200
  },
  defaultButtonShadowless: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    paddingLeft: 2,
  },
  defaultButton: {
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
    },
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  playbutton: {
    height: 30,
    width: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderContainer: {
    width: window.width - 40,
    marginRight: 10,
    flexDirection: 'column',
    flex: 10
  },
  slider: {
    height: 30,
  },
  timeInfo: {
    flexDirection: 'row',
  },
  time: {
    color: '#525b58',
    flex: 1,
    fontSize: 10,
  },
  timeRight: {
    color: '#525b58',
    textAlign: 'right',
    flex: 1,
    fontSize: 10,
  }
};

const htmlStyles = {
  a: {
    fontWeight: '300',
    color: '#FF3366', // pink links
  },

  li: {
    color: 'black',
    fontFamily: 'Catamaran-Light',
    alignSelf: 'flex-start',
    borderColor: '#29487d',
    borderRadius: 7,
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },

  div: {
    paddingLeft: 20,
  },

  ul: {
    marginLeft: 0,
    paddingLeft: 20,
    paddingRight: 10,
  },

  p: {
    padding: 10,
    marginBottom: 0,
  },
};

function withLeadingZero(amount) {
  if (amount < 10) {
    return `0${amount}`;
  } else {
    return `${amount}`;
  }
}

function formattedTime(timeInSeconds) {
  var minutes = Math.floor(timeInSeconds / 60);
  var seconds = timeInSeconds - (minutes * 60);
  if (timeInSeconds < 0) {
    minutes = 0;
    seconds = 0;
  }
  if (isNaN(minutes) || isNaN(seconds)) {
    return '';
  } else {
    return (`${withLeadingZero(minutes)}:${withLeadingZero(seconds.toFixed(0))}`);
  }
}

const mapStateToProps = state => {
  const { detailCourse, loading } = state.detailCourse;
  return {
    detailCourse: detailCourse,
    loading: loading
  };
};

export default connect(mapStateToProps,
  { detailCourseFetch })(CourseView);
