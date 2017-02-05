import React from 'react';
import { View, ScrollView, ListView, Text, TouchableHighlight, Dimensions } from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';


const GF = require('../GF');

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const LessonScrollView = ({ desc, renderRow, dataSource, onPress }) => {

  return (
    <View style={[GF.border('blue'), { flexDirection: 'column' }]}>
      <View style={[GF.border('green'), { justifyContent: 'center' }]}>
        <View style={[GF.border('red'), { flexDirection: 'row', margin:5, paddingLeft:5 }]}>
          <MIcon name='chevron-right' size={20} color='#7a5de8' style={{opacity:0.7}}/>
          <Text style={[styles.title_text, { fontFamily: 'Raleway', color: '#442dc9' }]}>{desc}</Text>
          <Text style={[styles.title_text, { fontFamily: 'Raleway', color: '#2e2b4f' }]}>Lessons</Text>
        </View>
      </View>

      <ScrollView
      style={[GF.border('red')]}
      onLayout={ev => console.log('그 다음 나오는 값들' + ev.nativeEvent.layout.height)}
      >
      <View style={{paddingBottom:5, paddingLeft:10}}>
        <ListView
        dataSource={dataSource}
        renderRow={renderRow}
        horizontal={true}
        enableEmptySections
        />
      </View>
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
