import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ListView,
  Modal,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

import Calendar from '../../react-native-calendar';

import { applyFetch, updateApply } from '../actions';
import { CardSection, Button } from './common';
import ApplyCheckbox from './common/ApplyCheckbox';
import TabNaviBar from './common/TabNaviBar';

const GF = require('./GF');

const width = Dimensions.get('window').width;


//so, redux, or connect is not installed at all..
//hahahaha..

//date를 형성을 할 때, 애초에 다르게 형성을 할 수 있으면 됨.
class Apply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      scheduledStates: [],//added..
      disabledStates:[],//added..
      appliedStates:[],//added..
      // week_panel_obj:[],
      visible: false,
      apply_array: [],

    };


    this.onDateChange = this.onDateChange.bind(this);
    this.onMonthChangeWithFetchingFromServer = this.onMonthChangeWithFetchingFromServer.bind(this);
  }

  componentWillMount(){

    this.props.applyFetch(this.props.user.email);
    //꼭, auto =1을 붙여주세요. 붙이지 않을 시에는 자동으로 서버 연산된 값이 오는게 아니라 manually입력을 해야 합니다.

  }

  onDateChange(day){
    //1. day를 하나씩 누를 때는, 해당시간에 get_list를 call.
    //2. when previous, next clicked => get_calendar call..
    console.log(day);
    console.log(day.getMonth()+1);
    console.log(day.getDate());
    console.log(day.getFullYear());
    console.log(day.getTimezoneOffset()/60); // -9, -4 etc.. => i've only tested integer offset so far..
    query = `https://www.ringleplus.com/api/v1/calendar/get_list?email=sungpah@stanford.edu&year=2017&month=1&day=1`;
    fetch(query)
    .then( response => response.json() )
    .then( json => this.handleResponseDay(json.response))
    .catch((error) => {
      console.log(error);
    })
  }

//    return <View><Text>{obj.classtime_str}</Text></View>;

  onClick(data) {
    const items = this.state.apply_array;

    data.checked = !data.checked; //이 data가 apply array에서 온 것
    console.log('on click', data.checked);
    this.setState(
      {
        apply_array: items
      }
    );
  }

  renderRow(obj){
    //obj.having_schedule..
    //obj.applied..

    console.log(obj)
    if(obj.applied && obj.checked===undefined){
      obj.checked=true;
    }

    return (
      <View style={[GF.border('yellow'), {flexDirection:'row'}]}>
        <ApplyCheckbox
          data={obj}
          onClick={() => this.onClick(obj)}
          text={obj.classtime_str}
        />
      </View>
    );

    //그다음 중요 한 것은, 이렇게 어레이를 만든 다음에, 체크 박스를 ( 아마도 touchable opacity같은 것으로 만들겠지만 ),
    //체크, 언체크 할 때, 키 값을 찾아가서 해당 state를 업데이트 해주도록 한다. //
    //그리고 최종적으로 save를 누를 때 변화시키도록 한다.
    //문제는 save를 누르지 않았을 때는? => 서버에서 한 번더 불러와서 appstate를 바꾸어 주면 된다.
    //
  }

  set_apply_times(obj){

    this.setState({
      apply_array:obj,
    });

  }

  render_apply_times(){

    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    // console.log('week panel', this.props.weekPanel);

    return (
      <View>
        <View style={{marginTop:5, marginBottom:15, backgroundColor: '#fff', alignItems:'flex-end'}}>
          <TouchableOpacity
          onPress={()=>this.onDecline(this.state.apply_array)}
          >
            <MIcon name='clear' size={20} color='#897FA6' />
          </TouchableOpacity>
        </View>

        <View style={[GF.border('blue'), {flexDirection:'row', width:width*0.87, justifyContent:'center', marginBottom:5}]}>
          <View style={[GF.border('red'), {alignItems:'center', width:width*0.07}]} />
          <View style={[GF.border('red'), {alignItems:'center', width:width*0.15}]}>
            <Text style={styles.textStyle}>ID</Text>
          </View>
          <View style={[GF.border('red'), {alignItems:'center', width:width*0.3}]}>
            <Text style={styles.textStyle}>Class Time</Text>
          </View>
          <View style={[GF.border('red'), {alignItems:'center', width:width*0.15}]}>
            <Text style={styles.textStyle}>Applied</Text>
          </View>
          <View style={[GF.border('red'), {alignItems:'center', width:width*0.2}]}>
            <Text style={styles.textStyle}>Scheduled</Text>
          </View>

        </View>
        <ListView
        dataSource={ds.cloneWithRows(this.state.apply_array)}
        renderRow={this.renderRow.bind(this)}
        enableEmptySections
        />
      </View>
    );


  }

  onMonthChangeWithFetchingFromServer(year,month){
    console.log('data.....prev, next clicked');
    console.log(year,month);
    //여기는 prev/next button이 눌릴 때 동작 하는 부분.
    query = `https://www.ringleplus.com/api/v1/calendar/get_calendar?email=sungpah@stanford.edu&year=${year}&month=${month}`;
    fetch(query)
    .then( response => response.json() )
    .then( json => this.handleResponseMonth(json.response))
    .catch((error) => {
      console.log(error);
    })
  }

    handleResponseDay(response){
      console.log('applied...');
      console.log(response.week_panel);
    }


  handleResponseMonth(response){


  }

  onDecline(obj) {
    this.setState({ visible: false });
    for(i=0; i<obj.length; i++){
      obj[i].checked=undefined;
    }

  }

  renderCalendar() {
    var eventDates = [];
    const customStyle = {


      hasEventCircle: {
        backgroundColor: '#CCCCF2'
      },
      selectedDayCircle: {
        backgroundColor: '#7a5de8',
      },
      day: {
        color: '#2e2b4f'
      },
      dayHeading: {
        color: '#2e2b4f'
      },
      weekendDayText: {
        color: '#2e2b4f'
      },
      weekendHeading: {
        color: '#2e2b4f'
      },
      currentDayText: {
        color: '#7a5de8'
      },
      currentDayCircle: {
      backgroundColor: '#7a5de8',
    },
    }

    for (i = 0; i <= 6; i++){
      const obj = this.props.weekPanel.find(x => x.index === i);
      if (obj === undefined){
      }else{
        var day = obj.day.substring(0,10);
        eventDates.push(day);
      }
    }

    return(
      <View style={{marginTop:20, borderWidth:1, borderColor:'#e3decf'}}>
        <Calendar
          eventDates={eventDates}
          customStyle={customStyle}
          weekStart={0}
          onDateSelect={(date) => {
            for (i = 0; i <= 6; i++){
              const obj = this.props.weekPanel.find(x => x.index === i);
              if (obj === undefined){
              }else{
                if( date.substring(0,10) == obj.day.substring(0,10) ) {

                  this.set_apply_times(obj.array);
                  this.setState({visible:!this.state.visible})
                }
              }
            }
          }}
        />
      </View>
    );
  }

  renderSpinner() {
    if (this.props.loading) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={'large'} />
        </View>
      );
    }
  }

  onSave() {
    var applyObj=[];

    console.log('check box', this.state.apply_array);

    for (i = 0; i < this.state.apply_array.length; i++){

      if(this.state.apply_array[i].checked){
        console.log(this.state.apply_array[i].classtime_str);
        applyObj.push({
          classtime_id: this.state.apply_array[i].classtime_id,
          selected: true
        });

      }
      else{
        // this.state.apply_array[i].checked=false;
        applyObj.push({
          classtime_id: this.state.apply_array[i].classtime_id,
          selected: false
        });
      }

    }
    console.log(applyObj);
    this.props.updateApply(applyObj, this.props.user.token);

    this.setState({ visible: false });


  }

  render() {
    console.log(this.props);


    return (
      <View style={{ flex: 1, marginBottom: 50, backgroundColor: '#f9f9f4' }}>
      <TabNaviBar title='Apply'/>
        <View style={styles.container}>
          <Text style={{fontFamily:'Raleway', color:'#2e2b4f', fontSize:15, paddingBottom:10}}>Your Current Time</Text>

          <View>
            <View style={styles.separator} />
          </View>

          <View style={{alignSelf:'center', marginTop:10}}>
            <View style={{flexDirection:'row', alignItems:'center', marginBottom:5}}>
              <MIcon name='watch-later' size={25} color='#7a5de8' style={{paddingRight:5, opacity:0.5}}/>
              <View style={{width:width*0.18}}>
                <Text style={{fontFamily: 'Raleway', fontSize: 13, color: '#897FA6'}}>
                  Date
                </Text>
              </View>
              <Text style={{fontFamily:'Raleway', color:'#7a5de8', fontSize:17}}>{this.props.timeNow}</Text>
            </View>

            <View style={{flexDirection:'row', alignItems:'center'}}>
              <MIcon name='location-on' size={25} color='#7a5de8' style={{paddingRight:5, opacity:0.5}}/>
              <View style={{width:width*0.18}}>
              <Text style={{fontFamily: 'Raleway', fontSize: 13, color: '#897FA6'}}>
                Location
              </Text>
              </View>
              <Text style={{fontFamily:'Raleway', color:'#2e2b4f', fontSize:15}}>{this.props.user.timezone}</Text>
            </View>
          </View>

          {this.renderCalendar()}

          <Modal
            visible={this.state.visible}
            transparent
            animationType="slide"
            onRequestClose={() => {}}
          >
            <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: 'rgba(0, 0, 0, 0.75)'}}>
              <View style={{width:width}}>

                <CardSection style={{justifyContent:'center', paddingBottom:10}}>
                  {this.render_apply_times()}
                </CardSection>
                <CardSection style={{justifyContent:'center'}}>
                  <Button onPress={this.onSave.bind(this)} style={{width:100}}>Save</Button>
                </CardSection>


              </View>
            </View>
          </Modal>
          {this.renderSpinner()}
        </View>

        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, backgroundColor: '#e3decf' }} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:20,
    alignItems: 'center',
    backgroundColor: '#f9f9f4',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textStyle: {
    fontFamily: 'Raleway',
    color: '#897FA6',
    fontSize: 13
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd',
    width:width*0.9
  }
});

const mapStateToProps = state => {
  const { user } = state.auth;
  const { loading, weekPanel } = state.apply;
  const { timeNow } = state.upcomingLessons;
  return {
    user: user,
    weekPanel: weekPanel,
    loading: loading,
    timeNow: timeNow
  };

};

export default connect(mapStateToProps, { applyFetch, updateApply })(Apply);
