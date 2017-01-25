import React from 'react';
import { View, ScrollView, ListView, Text, TouchableHighlight } from 'react-native';

const GF = require('../GF');

const LessonScrollView = ({ desc, renderRow, dataSource, onPress }) => {

  return (
    <View style={[GF.border('gray'), { flexDirection: 'column' }]}>
      <View style={[GF.border('green'), { flexDirection: 'row', justifyContent: 'space-between' }]}>
        <View style={[GF.border('red'), { flexDirection: 'row', marginBottom: 5, marginTop: 10, marginLeft: 10 }]}>
          <Text style={[styles.title_text, { fontFamily: 'Avenir', color: '#442dc9' }]}>{desc}</Text>
          <Text style={[styles.title_text, { fontFamily: 'Avenir', color: '#2e2b4f' }]}>Lessons</Text>
        </View>
      </View>

      <ScrollView
      style={[GF.border('red')]}
      onLayout={ev => console.log('그 다음 나오는 값들' + ev.nativeEvent.layout.height)}
      >
        <ListView
        dataSource={dataSource}
        renderRow={renderRow}
        horizontal={true}
        enableEmptySections
        />
      </ScrollView>


    </View>
  );
};

const styles = {
  title_text: {
    fontSize: 15,
    marginLeft: 5
  }
};

export { LessonScrollView };
