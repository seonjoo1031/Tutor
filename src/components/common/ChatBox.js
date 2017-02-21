import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet} from 'react-native';

const ChatBox = ({ rowData, email }) => {

  const {chatbox_student,chatbox_admin} = styles;

  if ( rowData.sender_email != email){
    return(
      <TouchableHighlight underlayColor='#dddddd'>
        <View style={{marginBottom:10, alignItems:'flex-start'}}>
          <View style={chatbox_admin}>
            <Text style={{fontSize:14, fontFamily:'Raleway', color:'#7a5de8'}}>
              Ringle
            </Text>
            <View style={{padding:5, paddingLeft:15}}>
              <Text style={{fontSize:14,fontFamily:'Raleway', color:'#2e2b4f'}}>
                {rowData.text}
              </Text>
            </View>
            <View style={{alignItems:'flex-end'}}>
              <Text style={{fontSize:10,fontFamily:'Raleway', color:'#2e2b4f'}}>{rowData.date}</Text>
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
            <Text style={{fontSize:12, fontFamily:'Raleway', color:'#2e2b4f'}}>
              {rowData.sender_first_name}
              </Text>
            <View style={{padding:5, paddingLeft:15}}>
              <Text style={{fontSize:14,fontFamily:'Raleway', color:'#2e2b4f'}}>
                {rowData.text}
              </Text>
            </View>
            <View style={{alignItems:'flex-end'}}>
              <Text style={{fontSize:10,fontFamily:'Raleway', color:'#2e2b4f'}}>{rowData.date}</Text>
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
    backgroundColor:'rgba(122,93,232,0.2)',
    borderWidth: 1,
    borderColor:'#e3decf',
    borderRadius: 8,
    marginBottom:5,
    padding:5
  },

  chatbox_admin: {
    width:200,
    backgroundColor:'rgba(255,255,255,0.8)',
    borderWidth: 1,
    borderColor:'#e3decf',
    borderRadius: 8,
    marginBottom:5,
    padding:5
  }

});

export {ChatBox};
