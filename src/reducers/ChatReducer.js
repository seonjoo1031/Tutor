import {
  APPEND_MESSAGE,
  CHAT_INSERTED,
  APPEND_MESSAGE_COUNTER_PART,
} from '../actions/types';

const INITIAL_STATE = {
  page: 1,
  chatLog: [],
  chatLogCounterPart: [],
};

export default (state = INITIAL_STATE, action) => {
  const chatLog = state.chatLog;
  const chatLogCounterPart = state.chatLogCounterPart;

  switch (action.type) {
    case CHAT_INSERTED:
      return state;
    case APPEND_MESSAGE:
      console.log('action payload append message..');
      console.log(action.payload);
      return { ...state, chatLog: chatLog.concat(action.payload) };
    case APPEND_MESSAGE_COUNTER_PART:
      console.log('action payload append message..');
      console.log(action.payload);
      return { ...state, chatLogCounterPart: chatLogCounterPart.concat(action.payload) };

    default:
      return state;
  }
};
