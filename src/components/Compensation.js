import React, { Component } from 'react';
import { View, ScrollView, ListView, Text, Dimensions, Picker } from 'react-native';
import { connect } from 'react-redux';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

import {Select, Option} from '../../react-native-chooser';
import { compensationFetch, compensationFirstFetch } from '../actions';
import { Spinner } from './common';
import CompensationList from './CompensationList';
import NaviBar from './common/Navibar';


const GF = require('./GF');

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
var weekArr=[];


class Compensation extends Component {

  state={class:0, totalFee:0, year:'', week:''} //나중에 바꿔야 함

  componentWillMount() {
    this.props.compensationFirstFetch(this.props.user.token);
    this.createDataSource(this.props);
    this.pushArray();

    console.log(this.props);


  }

  componentWillReceiveProps(nextProps) {
    console.log('next props');
    if(nextProps.compensation.selected_year!==undefined){
      this.setState({
        year:nextProps.compensation.selected_year.toString(),
        week:nextProps.compensation.selected_week.toString()
      });
    }
    this.createDataSource(nextProps);

  }

  createDataSource({ compensationListings }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(compensationListings);
  }

  pushArray() {
    if(weekArr.length===0){
      for(i=1; i<=53; i++){
        weekArr.push(i.toString());
      }
    }

  }

  listViewForCompensation() {
    const {lesson_count, total_pay_paypal_considered} = this.props.compensation;
    if (this.props.compensationListings !== null) {
      if(this.props.compensationListings.length===0){
        return (
          <View>
            <Text style={{fontFamily:'Raleway', alignSelf:'center', fontSize:15, color:'#2e2b4f', padding:10}}>No Compensation</Text>
          </View>
        );
      }
        return (
          <View style={{paddingTop:10}}>
          <View style={{flexDirection:'row', alignItems:'center', marginBottom:5}}>
            <View style={{width:width*0.5, borderRightWidth:1, borderColor:'#e3decf'}}>
              <Text style={{fontFamily:'Raleway', alignSelf:'center', fontSize:13, color:'#2e2b4f'}}>Class for Compensation</Text>
              <Text style={{alignSelf:'center', fontFamily: 'Raleway', fontSize: 23, color: '#7a5de8'}}>{lesson_count}</Text>
            </View>
            <View style={{width:width*0.5}}>
              <Text style={[styles.textStyle, {alignSelf:'center'}]}>Total $</Text>
              <Text style={{alignSelf:'center', fontFamily: 'Raleway', fontSize: 22, color: '#7a5de8'}}>${total_pay_paypal_considered}</Text>
            </View>
          </View>
            <ListView
              dataSource={this.dataSource}
              renderRow={this.renderRow}
              enableEmptySections
            />

          </View>
        );
    } else {
      return (
        <View />
      );
    }
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

  renderRow(compensationItem) {
    return <CompensationList compensationItem={compensationItem} />;
  }

  onYearChange(year){
    this.setState({year: year})
    this.props.compensationFetch(this.props.user.token, year, this.state.week);
    this.createDataSource(this.props);
  }

  onWeekChange(week){
    this.setState({week: week});
    this.props.compensationFetch(this.props.user.token, this.state.year, week);

    this.createDataSource(this.props);
  }

  renderWeek() {
    const {expected_arrival_time, selected_week, selected_year} = this.props.compensation;

    if(this.props.compensation.range!=null){
      var date1=this.props.compensation.range.substring(0,10);
      var date2=this.props.compensation.range.substring(27,37);
      var arrival_date=expected_arrival_time.substring(0,10);
      var arrival_time=expected_arrival_time.substring(11,19);


      return (

          <View style={{alignItems:'center', marginBottom:5}}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginBottom:5}}>
              <EvilIcon name='calendar' size={30} color='#7a5de8' style={{opacity:0.8}} />
              <Text style={{fontFamily:'Raleway', fontSize:15, color:'#2e2b4f'}}>
                {date1}~{date2}
              </Text>
            </View>

            <View style={styles.separator} />

            <View style={{flexDirection:'row', marginTop:10, alignItems:'center'}}>
              <Text style={{fontFamily:'Raleway', fontSize:13, color:'#2e2b4f'}}>
                {'Compensating Time: '}
              </Text>

              <Text style={{fontFamily:'Raleway', fontSize:18, color:'#7a5de8'}}>
                {arrival_date} {arrival_time}
              </Text>
            </View>

          </View>


      );
    }
  }

  render() {
    console.log(this.state);
    var yy=this.state.year;
    var ww=this.state.week;
  


    return (
      <View style={{ flex: 1, backgroundColor: '#f9f9f4' }}>
        <NaviBar title='My Compensation'/>

        <View style={{flexDirection:'row', justifyContent:'center'}}>
          <Select
              onSelect = {this.onYearChange.bind(this)}
              defaultText  = {yy}
              category='Year'
              style = {{borderWidth : 1, borderColor : "#e3decf", backgroundColor:'white', width:width*0.45, margin:10}}
              textStyle = {styles.textStyle}
              backdropStyle  = {{backgroundColor : 'rgba(0, 0, 0, 0.75)'}}
              optionListStyle = {{backgroundColor:'white'}}
              indicator = 'down'
              indicatorColor = "#e3decf"
            >
            <Option value = "2017" styleText={styles.optionStyle}>2017</Option>
            <Option value = "2016" styleText={styles.optionStyle}>2016</Option>
            <Option value = "2015" styleText={styles.optionStyle}>2015</Option>
            <Option value = "2014" styleText={styles.optionStyle}>2014</Option>
          </Select>

          <Select
              onSelect = {this.onWeekChange.bind(this)}
              defaultText  = {ww}
              category='Week'
              style = {{borderWidth : 1, borderColor : "#e3decf", backgroundColor:'white', width:width*0.45, margin:10}}
              textStyle = {styles.textStyle}
              backdropStyle  = {{backgroundColor : 'rgba(0, 0, 0, 0.75)'}}
              optionListStyle = {{backgroundColor:'white', height:height*0.7}}
              indicator = 'down'
              indicatorColor = "#e3decf"
            >

            { weekArr.map((s, i) => {
                      return <Option key = {i} value={s} styleText={styles.optionStyle}>{s}</Option>
                   }) }
          </Select>
        </View>
          {this.renderWeek()}
        <ScrollView style={{ flex: 1 }}>

          <View>
            {this.listViewForCompensation()}
            {this.renderSpinner()}
          </View>

        </ScrollView>
      </View>
    );
  }
}

const styles = {
  textStyle: {
    fontFamily: 'Raleway',
    fontSize: 13,
    color: '#2e2b4f'
  },
  optionStyle: {
    fontFamily: 'Raleway',
    fontSize: 15,
    color: '#2e2b4f'
  },
  separator: {
    height: 1,
    width:width,
    backgroundColor: '#dddddd'
  }
}

const mapStateToProps = state => {
  const { user } = state.auth;
  const { year, week, compensation, compensationListings, loading } = state.compensation;
  return {
    user: user,
    compensation: compensation,
    compensationListings: compensationListings,
    loading: loading,
    year: year,
    week: week
  };
};

export default connect(mapStateToProps, { compensationFetch, compensationFirstFetch })(Compensation);
