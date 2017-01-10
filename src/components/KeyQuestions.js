import React, { Component } from 'react';
import { Text, View, ScrollView, ListView, Image } from 'react-native';
import Navibar from './common/Navibar';

const GF = require('./GF');


class KeyQuestions extends Component {
  componentWillMount() {
    console.log(this.props.lesson);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.guid !== r2.guid
    });
    this.dataSource = ds.cloneWithRows(this.props.lesson.key_question);
  }

  imgRender(imgURL) {
    if (imgURL === null || imgURL === '' || imgURL === 'N/A') {
      return (
        <View />
      );
    } else {
      return (
        <View style={[GF.border('green')]}>
          <Image style={styles.imageRow} source={{ uri: imgURL }} />
        </View>
      );
    }
  }

  renderRowKeyQuestion(rowData) {
      return (
          <View style={[GF.border('blue')]}>
            <View style={[GF.border('yellow')]}>
              <View style={[{ marginTop: 10, flexDirection: 'row' }, GF.border('red')]}>
                <View>
                  <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#7a5de8', paddingLeft: 3, paddingRight:3}}>{rowData.question_number + ". "}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[{ paddingRight: 10, color: '#2e2b4f', fontSize: 15 }]}>
                    {rowData.content_main}
                  </Text>
                </View>
              </View>
              <View style={{ marginLeft: 25 }}>
                <Text style={[{ fontWeight: 'bold', paddingTop: 5, color: '#897FA6' }]}>
                  {rowData.content_sub}
                </Text>
              </View>

              {this.imgRender(rowData.img_url)}
              <View style={[GF.border('blue'), { marginTop: 10 }]} />
            </View>
              <View style={{ height: 1, backgroundColor: '#dddddd' }} />
          </View>
        );
  }


  renderKeyQuestion() {
    console.log(this.dataSource);
    console.log(this.dataSource.rowIdentities[0]);
    console.log(this.dataSource.rowIdentities[0].length);
    if (this.dataSource.rowIdentities[0].length === 0) {
      return (
        <View style={{ alignItems: 'center', marginTop: 100 }}>
          <Text style={{ color: '#2e2b4f', fontSize: 20 }}>이 교재에는 KeyQuestions이{'\n'}</Text>
          <Text style={{ color: '#2e2b4f', fontSize: 20 }}>제공되지 않습니다.</Text>
        </View>
      );
    }
    return (
      <ListView
         removeClippedSubviews={false}
         dataSource={this.dataSource}
         enableEmptySections
         renderRow={this.renderRowKeyQuestion.bind(this)}
      />
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f9f9f4' }}>
        <Navibar title='Key Questions' />
        <ScrollView style={{ flex: 1 }}>
          <View style={{ padding: 20, flex: 1 }}>
            {this.renderKeyQuestion()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  imageRow: {
    flex: 1,
    resizeMode: 'contain',
    backgroundColor: 'rgba(0,0,0,0)',
    width: null,
    height: 200
  },
  answerButtonImageStyle: {
    width: 25,
    height: 25,
  },
  saveButtonStyle: {
    backgroundColor: '#f9f9f4',
    borderColor: '#7a5de8',
    height: 70,
    width: 70,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    borderWidth: 1
  }
};

export default KeyQuestions;
