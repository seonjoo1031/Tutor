import React, { Component } from 'react';
import { WebView, View, Text, ScrollView, Dimensions } from 'react-native';
import { Spinner } from './common';
import Navibar from './common/Navibar';


const GF = require('./GF');

class RenderWebView extends Component {
  state = {
    isLoading: false,
  };


  loadingStart() {
    this.setState({
      isLoading: true
    });
  }

  loadingFinish() {
    this.setState({
      isLoading: false
    });
  }

  renderSpinner() {
    console.log(this.state.isLoading);
    if (this.state.isLoading) {
      return <Spinner size="large" />;
    }
  }

  renderNaviBar() {
    console.log(this.props);
    if (this.props.fromWhere === 'googleDocs') {
      return (
        <Navibar title='Google Document' />
      );
    }
    if (this.props.fromWhere === 'website') {
      return (
        <Navibar title='Ringle' />
      );
    }
      return (
        <Navibar title='Article' />
      );

  }


  render() {
    //device height만큼 만들면 되겠규만?
    return (
      <View style={{ flex: 1 }}>
        {this.renderNaviBar()}
        <WebView
            source={{ uri: this.props.url }}
            allowsInlineMediaPlayback={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            decelerationRate="normal"
            onLoadStart={() => this.loadingStart()}
            onLoad={() => this.loadingFinish()}
            style={[{
            alignItems: 'stretch',

          }, GF.border('red')]}
        />
        <View style={{ backgroundColor: 'rgba(0,0,0,0)', position: 'absolute', top: 100, left: 0, right: 0 }}>
          {this.renderSpinner()}
        </View>
      </View>

    );
  }
}

export default RenderWebView;
