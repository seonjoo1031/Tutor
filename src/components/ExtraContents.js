import React, { Component } from 'react';
import { Text, View, ScrollView, WebView, TouchableHighlight, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import { Spinner } from './common';
import Navibar from './common/Navibar';

const GF = require('./GF');
const width = Dimensions.get('window').width;


class ExtraContents extends Component {
  state = { isLoading: false };

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

  renderContents() {
    if (this.props.contentType === 'youtube') {
      return (
        this.renderYoutube()
      );
    } else if (this.props.contentType === 'article') {
      return (
        this.renderArticle()
      );
    }
  }

  renderSpinner() {
    console.log(this.state.isLoading);
    if (this.state.isLoading) {
      return <Spinner size="large" />;
    }
  }


  renderYoutube() {
    const defaultURL = 'https://www.youtube.com/embed/';
    const videoURLArray = this.props.lesson.video_url_array;
    const tempVideoURLArray = [];
    videoURLArray.forEach((val, i) => {
      const url = defaultURL + val;
      if (val === '' || val === 'N/A' || val === null ) {
      } else {
        tempVideoURLArray.push(
          <View key={i} style={{ flex: 1, marginTop: 20, marginBottom: 20 }}>
            <Text style={{ color: '#2e2b4f', fontFamily:'Raleway', marginBottom:5 }}>Video Material {i + 1}</Text>
            {this.renderSpinner()}
            <WebView
            source={{ uri: url }}
            allowsInlineMediaPlayback={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onLoadStart={() => this.loadingStart()}
            onLoad={() => this.loadingFinish()}
            decelerationRate="normal"
            style={[{ alignItems: 'stretch', height: 200 }, GF.border('red')]}
            />
          </View>
        );
      }
    });

    return (
      <View>
        <View style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.introTextStyle}>These are video materials that Ringle selected carefully. If you watch these videos before class, it will help you to prepare for class.</Text>
        </View>
        </View>
        {this.renderYoutubeUrl(tempVideoURLArray)}
      </View>
    );
  }

  renderYoutubeUrl(tempVideoURLArray) {
    if (tempVideoURLArray.length === 0) {
      return (
        <View style={{ marginTop: 50, alignItems: 'center' }}>
          <Text style={styles.noTextStyle}>No video meterial provided for this course.</Text>
        </View>
      );
    } else {
      return tempVideoURLArray;
    }
  }

  renderArticle() {
    const articleURLArray = this.props.lesson.article_url_array;
    const articleStrArray = this.props.lesson.article_str_array;
    const tempArticleURLArray = [];

    articleURLArray.forEach((val, i) => {
      if (val === '' || val === 'N/A' || val === null) {
      } else {
        console.log(val);
        tempArticleURLArray.push(
          <View key={i} style={{marginBottom:15}}>
            <TouchableHighlight onPress={() => Actions.renderWebView({ url: val, fromWhere: 'article' })} underlayColor="#CCCCF2" >
              <View style={{ flexDirection:'row', justifyContent:'space-between', flex: 1, opacity:0.8, padding: 10, backgroundColor: 'white', borderLeftWidth: 3, borderColor: '#7a5de8' }}>
                <Text style={{ fontFamily:'Raleway', fontSize: 13, color: '#7a5de8', width:(width-40)*0.8}} numberOfLines={1}>
                  {articleStrArray[i]}
                </Text>

                <MIcon name='chevron-right' size={20} color='#7a5de8' style={{alignSelf:'center'}} />

              </View>
            </TouchableHighlight>
          </View>
        );
      }
    });
    return (
      <View style={{ margin: 20 }}>
        <View style={{marginBottom:20}}>
          <Text style={styles.introTextStyle}>These are article materials that Ringle selected carefully. If you read these articles before class, it will help you to prepare for class.</Text>
        </View>
        <View>
          {this.renderArticleUrl(tempArticleURLArray)}
        </View>
      </View>
    );
  }

  renderArticleUrl(tempArticleURLArray) {
    if (tempArticleURLArray.length === 0) {
      return (
        <View style={{ marginTop: 50, alignItems:'center' }}>
          <Text style={styles.noTextStyle}>No article provided for this course.</Text>
        </View>
      );
    } else {
      return tempArticleURLArray;
    }
  }

  renderNaviBar() {
    if (this.props.contentType === 'youtube') {
      return (
        <Navibar title='Video Repository' />
      );
    } else if (this.props.contentType === 'article') {
      return (
        <Navibar title='Article Repository' />
      );
    }
  }

  render() {
    console.log(this.props);
    return (
      <View style={{ flex: 1, backgroundColor:'#f9f9f4' }}>
        {this.renderNaviBar()}
        <ScrollView style={{ flex: 1, marginBottom: 10, marginLeft: 10, marginRight: 10 }}>
          {this.renderContents()}
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  noTextStyle: {
    fontFamily:'Raleway', color: '#2e2b4f', fontSize: 15
  },
  introTextStyle: {
    fontFamily:'Raleway', color: '#897FA6', fontSize: 14
  }
}

export default ExtraContents;
