import React, { Component } from 'react';
import { View, Text, Modal, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import SLIcon from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import { Button } from './Button';
import { MainButton } from './MainButton';
import { CardSection } from './CardSection';
import policy from '../policy.json';
import { updateConfirm } from '../../actions';
import Checkbox from './Checkbox';


const GF = require('../GF');

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class LessonScrollContent extends Component {

  constructor(props) {
      super(props);
      this.state = {
          dataArray: [],
          showCancelModal: false,
          showConfirmModal: false,
          showUnconfirmedCancelModal: false,
          allChecked: false
      };
  }

  componentDidMount() {
      this.loadData();
  }

  onCancelAccept() {
    const { id, tutor_id } = this.props.course;
    const tutor_confirmed = false;

    this.props.updateConfirm(id, tutor_id, tutor_confirmed);

    this.setState({ showCancelModal: false });
    this.setState({ showUnconfirmedCancelModal: false });
  }

  onAccept() {
    const { id, tutor_id } = this.props.course;
    const tutor_confirmed = true;
    var i;
    const len = this.state.dataArray.length;
    var checkedNum=0;

    for (i = 1; i < len; i++) {
      if (this.state.dataArray[i].checked === true)
        checkedNum++;
    }

    console.log('checked num: '+checkedNum);

    if (checkedNum === len-1) {
      this.props.updateConfirm(id, tutor_id, tutor_confirmed);

      for (i = 1; i < len; i++) {
        this.state.dataArray[i].checked = false;
      }

      this.setState({ showConfirmModal: false });

    }
    else {
      alert('Please check all policies.');
    }
  }

  onDecline() {
    this.setState({ showCancelModal: false });
    this.setState({ showUnconfirmedCancelModal: false });
    this.setState({ showConfirmModal: false });

    var i;
    const len = this.state.dataArray.length;
    for (i = 1; i < len; i++) {
      this.state.dataArray[i].checked = false;
    }
  }

  onConfirmPress() {
    console.log('confirm');
    this.setState({ showConfirmModal: !this.state.showConfirmModal });
  }

  onUnconfirmedCancelPress() {
    this.setState({ showUnconfirmedCancelModal: !this.state.showUnconfirmedCancelModal });
  }

  onCancelPress() {
    console.log('cancel');
    this.setState({ showCancelModal: !this.state.showCancelModal });
  }

  loadData() {
    this.setState({
        dataArray: policy
    });
  }

  renderCheckBox(data) {
    return (
        <Checkbox
          style={{ padding: 10 }}
          data={data}
          onClick={() => this.onClick(data)}
          text={data.id + '. ' + data.description}
        />
    );
  }

  renderPolicy() {
    var i;
    const len = this.state.dataArray.length;
    var views = [];
    if (!this.state.dataArray || this.state.dataArray.length === 0) return;
    for (i = 1; i < len-1; i++) {
      //console.log(this.state);
      views.push(
        <View style={[GF.border('red')]} key={i}>
          <View>
            {this.renderCheckBox(this.state.dataArray[i])}
          </View>
        </View>
      );
    }

    return views;
  }

  onClick(data) {
    if(data.id==10) {
      this.allCheck()
    }
    else {
      const items = this.state.dataArray;

      data.checked = !data.checked; //이 data가 dataArray에서 온 것
      this.setState(
        {
          dataArray: items
        }
      );
    }
  }

  allCheck() {
    var i;
    const len = this.state.dataArray.length;
    const items = this.state.dataArray;

    if (!this.state.allChecked) {
      for (i = 1; i < len; i++) {
        items[i].checked = true;
        this.setState(
          {
            dataArray: items,
            allChecked: true
          }
        );
      }
    }
    else {
      for (i = 1; i < len; i++) {
        items[i].checked = false;
        this.setState(
          {
            dataArray: items,
            allChecked: false
          }
        );
      }
    }
  }

  renderConfirmContent() {
    const date = new Date();
    const currentTime = date.getTime();
    const { start_time_mil } = this.props.course;

    var diff = start_time_mil - currentTime;

    if(diff<0){
      return (
        <View>
          <CardSection style={{ flexDirection: 'column', padding:15 }}>
            <View style={{alignItems:'center'}}>
              <Text style={styles.textStyle}>This is a past lesson.</Text>
            </View>
          </CardSection>

          <CardSection style={{justifyContent:'center', paddingTop:10, paddingBottom:10, paddingLeft:30, paddingRight:30}}>
            <Button onPress={this.onDecline.bind(this)} style={{width:100}}>OK</Button>
          </CardSection>
        </View>
      );
    }
    return(
      <View>
      <CardSection style={styles.cardSectionStyle}>
        <View style={{alignItems:'center', padding:10}}>
        <Text style={[styles.textStyle, {paddingBottom:5}]}>{this.state.dataArray[0].description}</Text>
        <Text style={[styles.textStyle, {color:'#7a5de8'}]}>Cacellation Policy</Text>
        </View>
      </CardSection>
      <CardSection style={{ flexDirection: 'column', height: height*0.7 }}>
        <ScrollView
          style={[GF.border('red')]}
        >
          {this.renderPolicy()}
          <Checkbox
            style={{ padding: 10 }}
            data={this.state.dataArray[10]}
            onClick={() => this.onClick(this.state.dataArray[10])}
            text={'Check all items.'}
          />
        </ScrollView>
      </CardSection>

      <CardSection style={[styles.cardSectionStyle, {padding:5}]}>
        <Button onPress={this.onAccept.bind(this)} style={{width:100, marginRight:30}}>Yes</Button>
        <Button onPress={this.onDecline.bind(this)} style={{width:100, marginLeft:30}}>No</Button>
      </CardSection>
      </View>
    );
  }

  renderConfirm() {
    const { containerStyle } = styles;
    if (this.state.showConfirmModal) {
      return (
        <View>
          <Modal
            visible={this.state.showConfirmModal}
            transparent
            animationType="slide"
            onRequestClose={() => {}}
          >
            <View>
              {this.renderConfirmContent()}
            </View>
          </Modal>
        </View>
      );
    }

    return (
      <View />
    );
  }

  renderFee(hours) {
    if (hours <= 12) {
      var fee = ((12-hours)/12)*10;
      return (
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <MIcon name='monetization-on' size={30} color='#7a5de8' style={{padding:8, opacity:0.5}} />
          <View>
          <Text style={{fontFamily: 'Raleway', fontSize: 13, color: '#7a5de8', paddingBottom:5}}>Fee</Text>
          <Text style={[styles.textStyle]}>${fee.toFixed(2)}</Text>
          </View>
        </View>
      );
    }
    else if (hours > 12) {
      return (
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <MIcon name='monetization-on' size={30} color='#7a5de8' style={{padding:8, opacity:0.5}} />
          <View>
            <Text style={{fontFamily: 'Raleway', fontSize: 13, color: '#7a5de8', paddingBottom:5}}>
              Fee
            </Text>
            <Text style={[styles.textStyle]}>None</Text>
          </View>
        </View>
      );
    }
    else return <View />
  }


  renderTimeCalc() {
    const date = new Date();

    const currentTime = date.getTime();
    const { start_time_mil } = this.props.course;

    var diff = start_time_mil - currentTime;

    if(diff<0){
      return (
        <View style={{alignItems:'center', marginLeft:50, marginRight:50}}>
          <Text style={styles.textStyle}>This is a past lesson.</Text>
        </View>
      );
    }
    else{
      var leftHours = Math.floor(diff/(1000*60*60));


      diff = diff/(1000*60);
      var mins = Math.floor(diff%60);
      diff = diff/60;
      var hours = Math.floor(diff%24);
      diff = diff/24
      var days = Math.floor(diff);

      //default(column)--> 가로 정렬이 align / 즉 자기축 아닌게 align인가보다
      return (
        <View>
          <View style={{flexDirection:'row', alignItems:'center', marginBottom:10}}>
            <MIcon name='watch-later' size={30} color='#7a5de8' style={{padding:8, opacity:0.5}} />
            <View>
              <Text style={{fontFamily: 'Raleway', fontSize: 13, color: '#7a5de8', paddingBottom:5}}>
                Current Time
              </Text>
              <Text style={[styles.textStyle]}>{this.props.timeNow}</Text>
            </View>
          </View>

          <View style={{flexDirection:'row', alignItems:'center', marginBottom:10}}>
            <MIcon name='timer' size={30} color='#7a5de8' style={{padding:8, opacity:0.5}} />
            <View>
              <Text style={{fontFamily: 'Raleway', fontSize: 13, color: '#7a5de8', paddingBottom:5}}>
                Time left to Cancel
              </Text>
              <Text style={[styles.textStyle]}>{days} days {hours} hours {mins} mins ({leftHours} hours)</Text>
            </View>
          </View>

          {this.renderFee(leftHours)}
        </View>
      );
    }
  }


  renderCancelDesc() {
    if (this.state.showCancelModal) {
      return (
        <View>
          <CardSection style={{ flexDirection: 'column', paddingTop:20, paddingBottom:20}}>
            {this.renderTimeCalc()}
          </CardSection>
        </View>
      );
    }
    else if (this.state.showUnconfirmedCancelModal) {

      const date = new Date();
      const currentTime = date.getTime();
      const { start_time_mil } = this.props.course;

      var diff = start_time_mil - currentTime;

      if(diff<0){
        return (
          <View>
          <CardSection style={{ flexDirection: 'column', padding:15 }}>
            <View style={{alignItems:'center', marginLeft:50, marginRight:50}}>
              <Text style={styles.textStyle}>This is a past lesson.</Text>
            </View>
          </CardSection>
          </View>
        );
      }

      return (
        <View>
        <CardSection style={{ flexDirection: 'column', padding:15 }}>
          <Text style={{fontFamily:'Raleway', fontSize:14, color:'#2e2b4f', alignSelf:'center'}}>
            This lesson is assigned to you.
          </Text>

          <Text style={{fontFamily:'Raleway', fontSize:14, color:'#2e2b4f', alignSelf:'center'}}>
            Do you want to cancel it?
          </Text>
        </CardSection>
        </View>
      );
    }
    return <View />
  }

  renderCancelButton() {
    const date = new Date();
    const currentTime = date.getTime();
    const { start_time_mil } = this.props.course;

    var diff = start_time_mil - currentTime;

    if(diff<0){
      return (
        <CardSection style={{justifyContent:'center', paddingTop:10, paddingBottom:10, paddingLeft:30, paddingRight:30}}>
          <Button onPress={this.onDecline.bind(this)} style={{width:100}}>OK</Button>
        </CardSection>
      );
    }
    else{
      return (
        <CardSection style={{justifyContent:'space-between', paddingTop:10, paddingBottom:10, paddingLeft:30, paddingRight:30}}>
          <Button onPress={this.onCancelAccept.bind(this)} style={{width:100}}>Yes</Button>
          <Button onPress={this.onDecline.bind(this)} style={{width:100}}>No</Button>
        </CardSection>
      );


    }

  }

  renderCancel() {
    const { containerStyle, cardSectionStyle } = styles;

    if (this.state.showCancelModal || this.state.showUnconfirmedCancelModal) {
      return (
        <View>
          <Modal
            visible={true}
            transparent
            animationType="slide"
            onRequestClose={() => {}}
          >
          <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: 'rgba(0, 0, 0, 0.75)'}}>
            <View>
              {this.renderCancelDesc()}
              {this.renderCancelButton()}

            </View>
          </View>
          </Modal>
        </View>
      );
    }
      return (
        <View />
      );
  }

  renderButton() {
    if (this.props.course.tutor_confirmed) {
      return (
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={[{ fontSize: 16, color: '#B1D877', fontFamily: 'Raleway' }, GF.border('red')]}>
              {'Confirmed'}
            </Text>
            <MIcon name='check-circle' size={23} color='#B1D877' />
          </View>

          <View style={{ paddingTop: 4, alignItems: 'center' }}>
            <MainButton onPress={this.onCancelPress.bind(this)} style={{width:100}}>CANCEL</MainButton>
          </View>
        </View>
      );
    }

    return (
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={[{ fontSize: 15, color: '#F16A70', fontFamily: 'Raleway' }, GF.border('red')]}>
            {'Unconfirmed'}
          </Text>
          <MIcon name='error' size={23} color='#F16A70' />

        </View>

        <View style={{ paddingTop: 4, flexDirection: 'row', justifyContent: 'center' }}>
          <MainButton onPress={this.onConfirmPress.bind(this)} style={{width:width*0.24}}>CONFIRM</MainButton>
          <MainButton onPress={this.onUnconfirmedCancelPress.bind(this)} style={{width:width*0.24}}>CANCEL</MainButton>
        </View>
      </View>
    );
  }

  render() {
    const { id, start_time_short, course_title } = this.props.course;
    const { textStyle } = styles;

    return (
        <View style={[{ width: width*0.55, height: height*0.3, justifyContent: 'center' }, styles.lessonCardStyle]}>
          <View style={{ margin: 10 }}>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 2}}>
              <MIcon name='loyalty' size={20} color='#7a5de8' style={{opacity:0.5, paddingRight:5}} />
              <Text style={{fontFamily: 'Raleway', fontSize: 13, color: '#897FA6'}}>
                {'Lesson ID  '}
              </Text>
              <Text style={{fontFamily: 'Raleway', fontSize: 15, color: '#2e2b4f'}}>
                {id}
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 6}}>
              <MIcon name='watch-later' size={20} color='#7a5de8' style={{opacity:0.5, paddingRight:5}} />
              <Text style={{fontFamily: 'Raleway', fontSize: 13, color: '#897FA6'}}>
                {'Start  '}
              </Text>
              <Text style={[textStyle, GF.border('red')]}>
                {start_time_short}
              </Text>
            </View>

            <View style={{flexDirection: 'row', paddingBottom: 6, marginRight:20, alignItems:'center'}}>
              <MIcon name='create' size={20} color='#7a5de8' style={{opacity:0.5, paddingRight:5}} />

              <Text style={{fontSize: 13, color: '#2e2b4f', fontFamily:'Raleway'}} numberOfLines={1}>
                {course_title}
              </Text>
            </View>

            {this.renderButton()}
          </View>
          {this.renderCancel()}
          {this.renderConfirm()}
        </View>

    );
  }
}

const styles = {
  lessonCardStyle: {
    backgroundColor: '#f9f9f4',
    padding: 0,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    elevation: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e3decf',
  },
  cardSectionStyle: {
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 15,
    color: '#2e2b4f',
    fontFamily: 'Raleway'
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  }
};

const mapStateToProps = state => {
  const { timeNow } = state.upcomingLessons;
  return {
    timeNow: timeNow
  };
};

export default connect(mapStateToProps, { updateConfirm })(LessonScrollContent);
