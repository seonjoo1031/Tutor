import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,
    Dimensions
} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
const GF = require('../GF');


const width = Dimensions.get('window').width;

export default class ApplyCheckBox extends Component {
    constructor(props) {
        super(props);
    }

    onClick() {
      this.props.onClick();
    }

    renderText() {
        if (!this.props.text) return null;
        return (
          <Text style={styles.textStyle}>{this.props.text}</Text>

        );
    }

    renderApplied() {
      if(this.props.data.applied){
        return(
          <MIcon name='done' size={22} color='#7a5de8' />
        );
      }
      return(
        <MIcon name='done' size={22} color='#ffffff' />
      );
    }

    renderScheduled() {
      if(this.props.data.having_schedule){
        return(
          <MIcon name='done' size={22} color='#7a5de8' />
        );
      }
      return(
        <MIcon name='done' size={22} color='#ffffff' />
      );
    }

    renderImage() {

      //var source = this.props.data.checked ? require('../../../Resource/ic_check_box.png') : require('../../../Resource/ic_check_box_outline_blank.png');
      var source = this.props.data.checked ? 'check-box' : 'check-box-outline-blank';
      return (
          <MIcon name={source} size={22} color='#7a5de8' />
      );
    }

    render() {
      return (
        <TouchableHighlight
            style={{width:width*0.87}}
            onPress={() => this.onClick()}
            underlayColor='transparent'
        >
            <View style={[styles.container]}>
              <View style={[GF.border('blue'), {width:width*0.07, alignItems:'center'}]}>
              {this.renderImage()}
              </View>

              <View style={[GF.border('blue'), {width:width*0.15}]}>
              <Text style={[styles.textStyle, {fontSize:15, paddingLeft:7}]}>{this.props.data.classtime_id}</Text>
              </View>

              <View style={[GF.border('blue'), {width:width*0.3, paddingLeft:10}]}>
              {this.renderText()}
              </View>

            <View style={[GF.border('blue'), {width:width*0.15, alignItems:'center'}]}>
              {this.renderApplied()}
            </View>

            <View style={[GF.border('blue'), {width:width*0.2, alignItems:'center'}]}>
              {this.renderScheduled()}
            </View>
            </View>
        </TouchableHighlight>
      );
    }
}

const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderTopWidth: 1,
      borderColor: '#e3decf',
      paddingBottom:5,
      paddingTop:5


  },
  leftText: {
      flex: 1,
  },
  textStyle: {
      fontFamily: 'Raleway',
      color:'#2e2b4f',
      fontSize:15
  }
});
