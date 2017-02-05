import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';


const GF = require('./GF');

const width = Dimensions.get('window').width;


class CompensationListItem extends Component {

  renderStatus() {
    const { paid } = this.props.compensationItem;
    console.log(paid);
    if(paid)
    {
      return(
        <Text style={{fontFamily: 'Raleway',
        fontSize: 13,
        color: '#ffffff',
        alignSelf:'center',
        backgroundColor:'#B1D877'}}> Paid </Text>
      );

    }

    else{
      return(
        <Text style={{fontFamily: 'Raleway',
        fontSize: 13,
        color: '#ffffff',
        alignSelf:'center',
        backgroundColor:'#F16A70'}}> Not Paid </Text>
      );
    }
  }


//course_id,
  render() {
    const { id, start_time, money } = this.props.compensationItem;
    const { separator, textStyle } = styles;
    return (
      <View>
          <View style={{ flexDirection: 'row', alignItems:'center', justifyContent:'space-between', padding:10 }}>
            <View style={[GF.border('blue'), {width:width*0.12}]}>
              <Text style={textStyle}>{id}</Text>
            </View>
            <View style={[GF.border('blue'), {width:width*0.3, alignItems:'center'}]}>
              <Text style={textStyle}>{start_time.substring(0,10)}</Text>
            </View>

            <View style={[GF.border('blue'), {width:width*0.12, alignItems:'center'}]}>
              <Text style={textStyle}>${money}</Text>
            </View>
            <View style={[GF.border('blue'), {width:width*0.2, alignItems:'center'}]}>
              {this.renderStatus()}
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
    fontFamily: 'Raleway',
    fontSize: 15,
    color: '#2e2b4f',
    alignSelf:'center'
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

export default connect(mapStateToProps)(CompensationListItem);
