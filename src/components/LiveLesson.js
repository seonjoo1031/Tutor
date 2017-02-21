import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Platform, ListView, TouchableHighlight, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Pusher from 'pusher-js/react-native';
import KeepAwake from 'react-native-keep-awake';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { ChatBox, Input } from './common';
import Navibar from './common/Navibar';
import { appendMessage, appendMessageCounterPart, sendToAdmin, sendToCounterPart } from '../actions';
import { SubscriberView, PublisherView, Session } from '../../react-native-opentok';

const OPENTOK_API_KEY = '45550892';
const GF = require('./GF');

var pusher = new Pusher('6f4e2acaf256ab429686');
let handle = 0;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


class LiveLesson extends Component {

  constructor(props) {
    super(props);
    this.state = {
      session_id: 'N/A',
      token: 'N/A',
      text: null,
      device_height: 50,
      h: 50,
      hCounterPart: 50,
      is_admin_talk_enabled: false,
      is_counterpart_talk_enabled: false,
      device_emit: 0,
      listHeight: 0,
      scrollViewHeight: 0
    };

    const { lessonId } = this.props;
    const { id } = this.props.user;

    this.onChangeText = this.onChangeText.bind(this);
  }

  state = {
    dataSource: null,
    dataSourceCounterPart: null,
    dataSource_raw: [],
  };


  componentWillMount() {
    console.log(this.props);
    const { lessonId, user } = this.props;
    const { id } = this.props.user;

    query = `https://www.ringleplus.com/api/v1/lesson/create_and_fetch_lesson_config?lesson_id=${lessonId}&email=${user.email}`;
    fetch(query)
      .then((response) => response.json())
      .then((rsp) => {
        console.log(rsp);
        this.handleConfigResponse(rsp);
      })
      .catch((error) => console.log(error))
      .done();

      console.log('works!');
      console.log(this.state.session_id);

    this.createDataSource(this.props);

    console.log(pusher);
    console.log('inputs..');
    console.log(lessonId, id);
    pusher = new Pusher('6f4e2acaf256ab429686', {
      authEndpoint: "https://www.ringleplus.com/pusher/auth_mobile",
      auth: {
        params: {
          lesson_id: lessonId,
          user_id: id,
          system: Dimensions.OS,
          encrypted: true
          }
        }
      }
    );

    pusher.subscribe('presence-allchannel');

    this.pusher_subscription(`admin_channel_${lessonId}_userid_${id}`);
    this.pusher_subscription_counter_part(`test_channel_${lessonId}`);


    console.log('subscribing to presence-allchannel');
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  componentDidMount() {

    if (Platform.OS === 'android') {
       handle = setInterval(() => {
        console.log('0--0--0--0--0--0--0--0--0--0--0--');
        this.setState({
          device_emit: this.state.device_emit + 1,
        });
      }, 3000);
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    clearInterval(handle);
    handle = 0;
    this.pusher_unsubscribe();
    if (Platform.OS === 'android') {
      Session.disconnect();
    }
    console.log('unmount, disconnected...');
  }

  createDataSource({ chatLog, chatLogCounterPart }) {
    console.log('initially..createDataSource..');
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    console.log('chatLog', chatLog);
    this.dataSource = ds.cloneWithRows(chatLog);
  }

  scrollToBottom(){
    const bottomOfList = this.state.listHeight - this.state.scrollViewHeight
    console.log('scrollToBottom', this.scrollView);

    if(this.scrollView!==undefined && this.scrollView!==null){

      this.scrollView.scrollTo({ y: bottomOfList })
    }
  }

  pusher_unsubscribe() {
    const { lessonId } = this.props;
    const { id } = this.props.user;

    if (pusher !== null) {
      pusher.unsubscribe(`admin_channel_${lessonId}_userid_${id}`);
      pusher.unsubscribe(`test_channel_${lessonId}`);
      pusher.unsubscribe('presence-allchannel');

      console.log('pusher subscription ended..');
    } else {
      console.log('No pusher subscription to end..');
    }
  }


  sendToAdmin() {
    console.log('send to admin!');
    var date = new Date(Date.now());
    const { email, first_name, id } = this.props.user;
    const { lessonId } = this.props;

    var text = this.state.text;
    if (Platform.OS === 'ios') {
      date = date.toISOString();
    } else {
      date = date.toString();
    }
    if (this.state.text !== '') { //if text message exists!
      const object = { sender_email: email, sender_first_name: first_name, text: this.state.text, date: date };
      this.props.appendMessage(object); //then rendering will be done//
      const chatObject={email:email, text:text, date:date, channel_name:`admin_channel_${lessonId}_userid_${id}`, lesson_id: lessonId}
      this.props.sendToAdmin(chatObject);
      this.setState({
        text: ''
      });
    }
  }

  handleConfigResponse(rsp) {
    const { session_info } = rsp.response;

    this.setState({
      session_id: session_info.session_id,
      token: session_info.token
    });
    console.log('finally..');
  }

  _set_device_height(height){
    this.setState({
      device_height:height
    });
  }

  onBackBtnPressed() {
    //Session.disconnect();
    console.log('disconnected...');
    Actions.pop();
  }

  onChangeText(text){
    this.setState({
      text:text,
    });
  }

  pusher_subscription(channel_name) {
    const {email} = this.props.user;
    var channel = pusher.subscribe(channel_name);
    console.log(channel_name);
    channel.bind('my_event', function(data) {
      console.log(data);
      if (data != null) {
        if (data.sender_email === email.toLowerCase()) {
        } else {
          if (data.message != null){
            console.log('data');
            console.log(data);
            const object = {sender_email: data.sender_email, sender_first_name: data.sender_first_name, text:data.message, date: data.date};
            this.props.appendMessage(object);
            console.log('message received..');
          }
        }
      }
    }.bind(this));
  }
  //need to subscribe to multiple channels..
  //
  pusher_subscription_counter_part(channel_name) {

    const {email} = this.props.user;
    var channel = pusher.subscribe(channel_name);
    console.log(channel_name);

    channel.bind('my_event', function(data) {
      console.log(data);
      console.log('data at pusher subscription counter part..');
      if (data != null) {
        if (data.sender_email === email.toLowerCase()) {
        } else {
          if (data.message != null){
            console.log('data');
            console.log(data);
            //converting data to object that fits to the model.
            const object = {sender_email: data.sender_email, sender_first_name: data.sender_first_name, text:data.message, date: data.date};
            console.log(object);

            this.props.appendMessageCounterPart(object);
          }
        }
      }
    }.bind(this));
  }

  renderChatWithAdmin(){
    if(this.state.is_admin_talk_enabled){
      return(
      <View style={{ height: 300, backgroundColor: '#f9f9f4' }}>
      <ScrollView
        ref={ (ref) => this.scrollView = ref }
        style={[{ margin: 8, flex: 1, backgroundColor:'#f9f9f4'},GF.border('yellow')]}
        onContentSizeChange={ (contentWidth, contentHeight) => {
          this.setState({listHeight: contentHeight })
        }}
        onLayout={ (e) => {
          const height = e.nativeEvent.layout.height
          this.setState({scrollViewHeight: height })
        }}>
        <View>
          <ListView style={styles.listView}
            dataSource={this.dataSource}
            renderRow={this.renderRow.bind(this)}
            enableEmptySections/>
        </View>
      </ScrollView>

        <View style={[{ paddingLeft: 10, paddingRight: 10}, GF.border('red')]}>
          <Text style={{fontFamily:'Raleway', fontSize:14, marginLeft:5, marginBottom:10, color:'#2e2b4f'}}>To Admin</Text>
          <View style={[{ flexDirection: 'row' }]}>
            <KeyboardAwareScrollView>
            <View>
            <Input
              placeholder="Enter your message."
              onChangeText={this.onChangeText.bind(this)}
              value={this.state.text}
              autoCorrect={false}
              maxLength={255}
            />
            </View>
            </KeyboardAwareScrollView>
            <TouchableOpacity
              style={{ backgroundColor: '#f9f9f4', width: 50, height: 35, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(122,93,232,0.8)', borderRadius:8}}
              onPress={() => this.sendToAdmin()} >
              <Text style={{ fontFamily:'Raleway', fontSize:14, color: '#f5f5fc'}}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );

    } else{
      return <View />;
    }
  }

  renderOpenTok() {
    if (this.state.session_id !== 'N/A') {
      if (Platform.OS === 'android') {
        var publisherName = this.props.user.id + '_' + this.props.lessonId;
        return (
          <View style={{ flex: 1 }}>
            <PublisherView
            apiKey={OPENTOK_API_KEY}
            sessionId={this.state.session_id}
            token={this.state.token}
            style={[GF.border('gray'), { height: 80, width: 80, position: 'absolute', bottom: 0, right: 0 }]}
            publisherName={publisherName}
            />
            <SubscriberView
              apiKey={OPENTOK_API_KEY}
              sessionId={this.state.session_id}
              token={this.state.token}
              style={{ height: width, flex: 1 }}
            />
            <KeepAwake />

          </View>
        );
      } else {
        var publisherName = this.props.user.id + '_' + this.props.lessonId;
        return (
          <View style={[{ flex: 1 }, GF.border('red')]}>
            <SubscriberView
              apiKey={OPENTOK_API_KEY}
              sessionId={this.state.session_id}
              token={this.state.token}
              style={{ height: width}}
            />
            <PublisherView
            apiKey={OPENTOK_API_KEY}
            sessionId={this.state.session_id}
            token={this.state.token}
            style={[GF.border('gray'), { height: 100, width: 100, position: 'absolute', bottom: 0, right: 0 }]}
            publisherName={publisherName}
            />
            <KeepAwake />

          </View>
        );
      }
    } else {
      return (
        <View style={{ marginTop: 50, alignItems:'center' }}>
          <Text style={{fontFamily:'Raleway', fontSize:14, color:'#897FA6'}}>Entering class..</Text>
        </View>
      );
    }
  }
  //본인 이메일과 다른 경우가 다르게 나와야 함!
  renderRow(rowData, sectionID, rowID) {
    const { email } = this.props.user;
    return (
      <ChatBox rowData={rowData} email={email}/>
    );
  }

  render() {
    console.log('rendering again..');
    const { chatStyle } = styles;

    return (
      <View style={{ flex: 1, backgroundColor: '#f9f9f4' }}>
        <Navibar title='Live Lesson' />
          {this.renderOpenTok()}


          <View style={{ width: 0.1, height: 0.1 }}><Text>{this.state.device_emit}</Text></View>
        {this.renderChatWithAdmin()}
        <View style={{marginBottom:30, alignItems:'center', backgroundColor: '#f9f9f4' }}>
          <TouchableHighlight
            onPress={() => {
              this.setState({
                is_admin_talk_enabled: !this.state.is_admin_talk_enabled,
                is_counterpart_talk_enabled: false,
                text:''
              })
            }}
            underlayColor='#CCCCF2'
            style={chatStyle}
          >
            <Text style={{ color: '#f5f5fc', fontFamily:'Raleway', fontSize:14 }}>Chat with Admin</Text>
          </TouchableHighlight>
        </View>

      </View>
    );
  }
}

var styles = {
  container: {
    padding: 10,
    alignItems: 'center'
	},
  listView: {
    alignSelf: 'stretch',
  },
  chatStyle: {

    padding: 8,

    backgroundColor: 'rgba(122,93,232,0.8)',
    borderRadius: 20,
    width:150,
    alignItems:'center'
  },
}

const mapStateToProps = state => {
  const { user } = state.auth;
  const { chatLog, chatLogCounterPart, page } = state.chat;
  return {
    user: user,
    chatLog: chatLog,
    chatLogCounterPart: chatLogCounterPart,
    page: page,
  };
};
//

export default connect(mapStateToProps, { appendMessage, appendMessageCounterPart, sendToAdmin, sendToCounterPart })(LiveLesson);
