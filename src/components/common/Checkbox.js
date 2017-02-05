import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight
} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';


export default class CheckBox extends Component {
    constructor(props) {
        super(props);
    }

    onClick() {
      this.props.onClick();
    }

    renderText() {
      console.log(this.props.text);
        if (!this.props.text) return null;

        return (
            <Text style={styles.rightText}>{this.props.text}</Text>
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
            style={this.props.style}
            onPress={() => this.onClick()}
            underlayColor='transparent'
        >
            <View style={styles.container}>
              {this.renderImage()}
              {this.renderText()}
            </View>
        </TouchableHighlight>
      );
    }
}

const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',

  },
  leftText: {
      flex: 1,
  },
  rightText: {
      flex: 1,
      marginLeft: 10,
      fontFamily: 'Raleway'
  }
});
