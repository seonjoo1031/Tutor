import {
  APPEND_MESSAGE,
  APPEND_MESSAGE_COUNTER_PART,
  CHAT_INSERTED
} from './types';

import {
  urlForChatWithAdmin
} from '../components/common/ApiUrl';


export const sendToCounterPart = ({ email, text, date, channel_name, lesson_id }) => {
  //다 같지만, 마지막 handler가 다름..
  return (dispatch) => {
    fetch(urlForChatWithAdmin(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_email: email,
        text: text,
        channel_name: channel_name,
        date: date,
        lesson_id: lesson_id
      })
    })
    .then(response => response.json())
    .then(json => handleChatInsertCounterPart(dispatch, json.response))
    .catch(error => console.log(error))
    .done();
  };
};

export const sendToAdmin = ({ email, text, date, channel_name, lesson_id }) => {
  return (dispatch) => {
    fetch(urlForChatWithAdmin(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_email: email,
        text: text,
        channel_name: channel_name,
        date: date,
        lesson_id: lesson_id
      })
    })
    .then(response => response.json())
    .then(json => handleChatInsert(dispatch, json.response))
    .catch(error => console.log(error))
    .done();
  };
};

export const appendMessage = (data) => {
  //appendMessage
  return (dispatch) => {
    dispatch({
      type: APPEND_MESSAGE,
      payload: data
    });
  };
};

export const appendMessageCounterPart = (data) => {
  console.log('여기 동작함~');
  return (dispatch) => {
    dispatch({
      type: APPEND_MESSAGE_COUNTER_PART,
      payload: data
    });
  };
};


const handleChatInsert = (dispatch, response) => {
  console.log('chat inserted!!');
  console.log(response);

  dispatch({
    type: CHAT_INSERTED
  });
};

const handleChatInsertCounterPart = (dispatch, response) => {
  //존재 할 필요는 없음. 이부분은, 써버에 내가 쓴 텍스트를 보내늑 것인데, 렌더링은 여기서 하지는
  console.log('chat inserted!!');//이건 왜 존재
};
