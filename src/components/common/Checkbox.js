import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight
} from 'react-native';

export default class CheckBox extends Component {
    constructor(props) {
        super(props);
    }

    onClick() {
      this.props.onClick();
    }

    renderText() {
        if (!this.props.text) return null;
        return (
            <Text style={[styles.rightText, this.props.rightTextStyle]}>{this.props.text}</Text>
        );
    }

    renderImage() {

      var source = this.props.data.checked ? require('../../../Resource/ic_check_box.png') : require('../../../Resource/ic_check_box_outline_blank.png');

      return (
          <Image source={source} />
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
      alignItems: 'center'
  },
  leftText: {
      flex: 1,
  },
  rightText: {
      flex: 1,
      marginLeft: 10
  }
});
