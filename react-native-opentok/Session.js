import { NativeModules, NativeAppEventEmitter, Platform } from 'react-native';
const SessionManager = NativeModules.OpenTokSessionManager;

const listener = null;

export const connect = SessionManager.connect;
export const disconnect = SessionManager.disconnect;
export const sendMessage = SessionManager.sendMessage;

export const onMessageRecieved = (callback) => {
  listener = NativeAppEventEmitter.addListener(
      'onMessageRecieved',
      (e) => callback(e)
    );

    console.log('session js, onMessageReceived..?');
};

export const stopListener = () => listener.remove();
