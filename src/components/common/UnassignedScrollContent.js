import React, { Component } from 'react';
import { View, Text, Modal, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
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

class UnassignedScrollContent extends Component {

  constructor(props) {
      super(props);
      this.state = {
          dataArray: [],
          showConfirmModal: false,
          allChecked: false
      };
  }

  componentDidMount() {
      this.loadData();
  }

  onAccept() {
    const { lesson_id, tutor_id } = this.props.course;
    const tutor_confirmed = true;
    var i;
    const len = this.state.dataArray.length;
    var checkedNum=0;

    for (i = 1; i < len; i++) {
      if (this.state.dataArray[i].checked === true)
        checkedNum++;
    }

    console.log('checked num: '+checkedNum);
    console.log(this.props.course);


    if (checkedNum === len-1) {
      this.props.updateConfirm(lesson_id, 3, tutor_confirmed);

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

      data.checked = !data.checked;
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

  renderConfirm() {
    const { containerStyle, cardSectionStyle } = styles;

    if (this.state.showConfirmModal) {
      return (
        <View>
          <Modal
            visible={this.state.showConfirmModal}
            transparent
            animationType="slide"
            onRequestClose={() => {}}
          >
            <View style={containerStyle}>
              <CardSection style={cardSectionStyle}>
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

              <CardSection style={[cardSectionStyle, {padding:5}]}>
                <Button onPress={this.onAccept.bind(this)} style={{width:100, marginRight:30}}>Yes</Button>
                <Button onPress={this.onDecline.bind(this)} style={{width:100, marginLeft:30}}>No</Button>
              </CardSection>
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
    return (
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={[{ fontSize: 15, color: '#F16A70', fontFamily: 'Raleway' }, GF.border('red')]}>
            {'Unconfirmed'}
          </Text>
          <MIcon name='error' size={23} color='#F16A70' />

        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <MainButton onPress={this.onConfirmPress.bind(this)} style={{width:100}}>CONFIRM</MainButton>
        </View>
      </View>
    );
  }

  render() {
    console.log(this.props.course);
    const { lesson_id, start_time_short } = this.props.course;

    const { textStyle } = styles;

    return (
      <View style={[{ width: width*0.55, height: height*0.3, justifyContent: 'center' }, styles.lessonCardStyle]}>
        <View style={[{ padding: 10 }, , GF.border('blue')]}>
          <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 2}}>
            <MIcon name='loyalty' size={20} color='#7a5de8' style={{opacity:0.5, paddingRight:5}} />
            <Text style={{fontFamily: 'Raleway', fontSize: 13, color: '#897FA6'}}>
              {'Lesson ID  '}
            </Text>
            <Text style={{fontFamily: 'Raleway', fontSize: 15, color: '#2e2b4f'}}>
              {lesson_id}
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

          <View style={{flexDirection: 'row', paddingBottom: 6, marginRight:20}}>
            <MIcon name='create' size={20} color='#7a5de8' style={{opacity:0.5, paddingRight:5}} />

            <Text style={{fontSize: 13, color: '#2e2b4f', fontFamily: 'Raleway'}} numberOfLines={2}>
              {this.props.course.course.title}
            </Text>
          </View>

          {this.renderButton()}
        </View>
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

export default connect(mapStateToProps, { updateConfirm })(UnassignedScrollContent);
