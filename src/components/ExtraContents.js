import React, { Component } from 'react';
import { Text, View, ScrollView, WebView, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Spinner } from './common';
import Navibar from './common/Navibar';

const GF = require('./GF');

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
            <Text style={{ color: '#2e2b4f' }}>Video Material {i + 1}</Text>
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
        <View style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20, justifyContent: 'center', alignItems: 'center', marginTop: 0 }}>
          <View style={{ flexDirection: 'row' }}>

            <View>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2e2b4f' }}>Video Repository</Text>
            </View>
          </View>
          <View>
            <Text />
            <Text style={{ color: '#897FA6' }}>Ringle이 엄선한 비디오 링크 자료들 입니다. 수업 전 시청하고 오시면, 수업 준비에 큰 도움이 되십니다.</Text>
            <Text />
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
          <Text style={{ color: 'black', fontSize: 25, color: '#2e2b4f' }}>해당 교재는 유트브 동영상이 제공 되지 않습니다.</Text>
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
          <View key={i}>
            <TouchableHighlight onPress={() => Actions.renderWebView({ url: val, fromWhere: 'article' })} underlayColor="#CCCCF2" >
              <View style={{ flex: 1, opacity: 0.7, padding: 15, backgroundColor: 'white', borderWidth: 1, borderColor: '#7a5de8' }}>
                <Text style={{ fontSize: 15, color: '#7a5de8' }} numberOfLines={1}>
                  {articleStrArray[i]}
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        );
      }
    });
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 20 }}>
        <View style={{ flexDirection: 'row' }}>

          <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10, color: '#2e2b4f' }}>Article Repository</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', flexDirection: 'column', marginBottom: 20, marginTop: 7 }}>
          <Text style={{ color: '#897FA6' }}>Ringle이 엄선한 기사 링크 자료들 입니다.</Text>
          <Text style={{ color: '#897FA6' }}>수업 전 시청하고 오시면, 수업 준비에 큰 도움이 되십니다.</Text>
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
        <View style={{ marginTop: 50 }}>
          <Text style={{ color: '#2e2b4f', fontSize: 25 }}>해당 교재는 기사자료가 제공되지 않습니다.</Text>
        </View>
      );
    } else {
      return tempArticleURLArray;
    }
  }

  render() {
    console.log(this.props);
    return (
      <View style={{ flex: 1 }}>
        <Navibar title='Extra Contents' />
        <ScrollView style={{ flex: 1, marginBottom: 10, marginLeft: 10, marginRight: 10 }}>
          {this.renderContents()}
        </ScrollView>
      </View>
    );
  }
}

export default ExtraContents;
