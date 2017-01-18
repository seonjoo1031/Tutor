import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet} from 'react-native';

const ChatBox = ({ rowData, email }) => {

  const {chatbox_student,chatbox_admin} = styles;

  if ( rowData.sender_email != email){
    return(
      <TouchableHighlight underlayColor='#dddddd'>
        <View style={{marginBottom:10, alignItems:'flex-start'}}>
          <Text style={{color:'#28b496'}}>RINGLE</Text>
          <View style={chatbox_admin}>
            <Text style={{fontSize:12,color:'black'}}>
              {rowData.sender_first_name}
            </Text>
            <View style={{padding:10}}>
              <Text style={{fontSize:14,color:'black'}}>
                {rowData.text}
              </Text>
            </View>
            <View style={{alignItems:'flex-end'}}>
              <Text style={{fontSize:10}}>{rowData.date}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }else{
    return(
      <TouchableHighlight underlayColor='#dddddd'>
        <View style={{marginBottom:10, alignItems:'flex-end'}}>
          <View style={chatbox_student}>
            <Text style={{fontSize:12,color:'white'}}>
              {rowData.sender_first_name}
              </Text>
            <View style={{padding:10}}>
              <Text style={{fontSize:14,color:'white'}}>
                {rowData.text}
              </Text>
            </View>
            <View style={{alignItems:'flex-end'}}>
              <Text style={{fontSize:10}}>{rowData.date}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

};


var styles = StyleSheet.create({
  chatbox_student: {
    width:200,
    backgroundColor:'#7a5de8',
    borderRadius: 8,
    borderWidth: 2,
    borderColor:'#7a5de8',
    marginBottom:5
  },

  chatbox_admin: {
    width:200,
    backgroundColor:'#CCCCF2',
    borderRadius: 8,
    borderWidth: 2,
    borderColor:'#CCCCF2',
    marginBottom:5
  }

});

export {ChatBox};
