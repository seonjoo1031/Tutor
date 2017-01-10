import React, { Component } from 'react';
import { View, Text, Modal, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button } from './Button';
import { CardSection } from './CardSection';
import policy from '../policy.json';
import { updateConfirm } from '../../actions';
import Checkbox from './Checkbox';


const GF = require('../GF');
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
                <Text>{this.state.dataArray[0].description}</Text>
              </CardSection>
              <CardSection style={{ flexDirection: 'column', height: 400 }}>
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

              <CardSection style={cardSectionStyle}>
                <Button onPress={this.onAccept.bind(this)}>Yes</Button>
                <Button onPress={this.onDecline.bind(this)}>No</Button>
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
        <Text style={[{ fontSize: 15, color: '#2e2b4f', textAlign: 'center' }, GF.border('red')]}>
          Unassigned
        </Text>
        <Button style={[GF.border('red')]} onPress={this.onConfirmPress.bind(this)}>Confirm</Button>
      </View>
    );
  }

  render() {
    console.log(this.props.course);
    const { lesson_id, start_time_short } = this.props.course;
    const { textStyle } = styles;

    return (
        <View style={[{ width: 200, height: 180, justifyContent: 'center' }, styles.lessonCardStyle]}>
          <View style={[{ padding: 10, marginTop: 5, alignItems: 'center' }, , GF.border('blue')]}>
            <Text style={[textStyle, GF.border('red') ]}>
              {'Lesson ID('+lesson_id+')'}
            </Text>
            <Text style={[textStyle, GF.border('red')]}>
              {'Start : '+start_time_short}
            </Text>
            {this.renderButton()}
          </View>
          {this.renderConfirm()}
        </View>

    );
  }
}

const styles = {
  lessonCardStyle: {
    backgroundColor: 'white',
    padding: 0,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    elevation: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7a5de8',
    alignItems: 'center'

  },
  cardSectionStyle: {
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 15,
    textAlign: 'center',
    color: '#2e2b4f',
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
