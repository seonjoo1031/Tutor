import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image, Alert, TouchableOpacity, Dimensions, Modal, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { PreparationOptionButton, Button, CardSection } from './common';

const GF = require('./GF');
const width = Dimensions.get('window').width;

class UpcomingLessonListItem extends Component {

  state={
    showModal: false
  }

  componentWillMount() {
    this.preparationOptionFunction = this.preparationOptionFunction.bind(this);
  }

  preparationOptionFunction(type) {
    if (type === 'student') {
      this.setState({ showModal: !this.state.showModal });
    }
    else if (type === 'live') {
      console.log(this.props.upcomingLesson);
      Actions.liveLesson({ lessonId: this.props.upcomingLesson.id, user: this.props.user })
    }
  }

  rowPressed() {
    Actions.detailCourseView({ courseId: this.props.upcomingLesson.course_id, upcomingLesson: this.props.upcomingLesson });
  }


  onModalPress() {
		this.setState({
			...this.state,
			showModal : false
		});
	}

  renderModal() {
    console.log(this.props.upcomingLesson);

    const { first_name, last_name, timezone, email } = this.props.upcomingLesson.student;

      return(
        <View>
          <Modal
            visible={this.state.showModal}
            transparent
            animationType="slide"
          >
          <TouchableWithoutFeedback onPress={this.onModalPress.bind(this)}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: 'rgba(0, 0, 0, 0.75)'}}>
              <View>
              <CardSection style={{ flexDirection: 'column', paddingTop:20, paddingBottom:20, width:width*0.75 }}>
                <View style={{flexDirection:'row', alignItems:'center', marginBottom:10}}>
                  <MIcon name='account-circle' size={30} color='#7a5de8' style={{padding:10, opacity:0.5}} />
                  <View>
                    <Text style={{fontFamily: 'Raleway', fontSize: 13, color: '#7a5de8', paddingBottom:5}}>
                      Name
                    </Text>
                    <Text style={[styles.modalTextStyle]}>{first_name} {last_name}</Text>
                  </View>
                </View>

                <View style={{flexDirection:'row', alignItems:'center', marginBottom:10}}>
                  <MIcon name='location-on' size={30} color='#7a5de8' style={{padding:10, opacity:0.5}} />
                  <View>
                    <Text style={{fontFamily: 'Raleway', fontSize: 13, color: '#7a5de8', paddingBottom:5}}>
                      Timezone
                    </Text>
                    <Text style={[styles.modalTextStyle]}>{timezone}</Text>
                  </View>
                </View>

                <View style={{flexDirection:'row', alignItems:'center', marginBottom:10}}>
                  <MIcon name='email' size={30} color='#7a5de8' style={{padding:10, opacity:0.5}} />
                  <View>
                    <Text style={{fontFamily: 'Raleway', fontSize: 13, color: '#7a5de8', paddingBottom:5}}>
                      Email
                    </Text>
                    <Text style={[styles.modalTextStyle]}>{email}</Text>
                  </View>
                </View>
              </CardSection>
              </View>
            </View>

          </TouchableWithoutFeedback>
          </Modal>
        </View>
      );


  }

  render() {
    if(this.props.upcomingLesson.student==null){
      return <View/>
    }
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


             <TouchableOpacity onPress={()=>this.preparationOptionFunction('live')} style={buttonStyle}>
               <Text style={textStyle}>
                 Enter Class
               </Text>
             </TouchableOpacity>
         </View>
        <View style={separator} />
        {this.renderModal()}
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
  },
  textStyle: {
    alignSelf: 'center',
    color: '#ffffff',
    fontFamily: 'Raleway'
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7a5de8',
    borderRadius: 15,
    height: 35,
    width: width*0.33,
    marginLeft: 15
  },
  modalTextStyle: {
    fontSize: 15,
    color: '#2e2b4f',
    fontFamily: 'Raleway'
  },
};

const mapStateToProps = state => {
  const { user } = state.auth;
  return {
    user: user
  };
};

export default connect(mapStateToProps)(UpcomingLessonListItem);
