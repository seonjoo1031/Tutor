package io.callstack.react.opentok;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.RCTNativeAppEventEmitter;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.opentok.android.OpentokError;
import com.opentok.android.PublisherKit;
import com.opentok.android.Session;
import com.opentok.android.Stream;
import com.opentok.android.Connection;
import com.opentok.android.SubscriberKit;

import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;

public class OpenTokSessionManager extends ReactContextBaseJavaModule implements Session.SessionListener, Session.SignalListener {

    protected Session mSession;
    public static Set<PublisherKit> activePublishers;
    public static ConcurrentHashMap<Stream, SubscriberKit> activeSubscribers;

//    activePublishers

    public OpenTokSessionManager(ReactApplicationContext reactContext) {
        super(reactContext);
        activePublishers = new CopyOnWriteArraySet();
        activeSubscribers = new ConcurrentHashMap();
    }

    @Override
    public String getName() {
        return "OpenTokSessionManager";
    }

    @ReactMethod
    public void connect(String apiKey, String sessionId, String token) {
        if (mSession == null) {
            mSession = new Session(getReactApplicationContext(), apiKey, sessionId);
            Log.i("opentoksessionmanager", "session is created");
            mSession.setSessionListener(this);
            mSession.setSignalListener(this);
            mSession.connect(token);
        }

        WritableMap payload = Arguments.createMap();
        payload.putString("connectionId", mSession.getSessionId());

        Log.i("opentoksessionmanager", mSession.getSessionId().toString());
        sendEvent(Events.EVENT_CLIENT_CONNECTED, payload);

    }


    @ReactMethod
    public void disconnect() {
        Log.i("opentoksessionmanager", "disconnect button clicked");
        if (mSession != null) {
            mSession.disconnect();
            Log.i("opentoksessionmanager", "session disconnected..");
            if (activePublishers != null) {
                Iterator retCode = activePublishers.iterator();
                //p1 not existing?
                int count = 0;
                while (retCode.hasNext()) {
                    count++;
                    PublisherKit p1 = (PublisherKit) retCode.next();
                    Log.i("opentok-session", "Unpublishing the active publisher below..");
                    Log.i("publisherview", p1.toString());
                    mSession.unpublish(p1);
                    p1.destroy();
                }
                Log.i("opentoksessionmanage", String.format("used to have publishers in activepublishers..=%d",count));
                activePublishers.clear();
                Log.i("opentoksessionmanage","after clear()");
                Log.i("opentoksessionmanage", activePublishers.toArray().toString());

                int count2 = 0;
                Iterator retCode2 = activePublishers.iterator();
                while(retCode2.hasNext()) {
                    count2 ++;
                }
                if(activePublishers.toArray() !=null){
                    Log.i("opentoksessionmanage", "here it is!");
                    Log.i("opentoksessionmanage", activePublishers.toArray().toString());
                    Log.i("opentoksessionmanage", String.format("now publishers in activepublishers..=%d",count2));
                    mSession.disconnect();
                }
            }

            Log.i("opentok-session", "do we have subscribers to close?");
            Iterator retCodeSubscriber = activeSubscribers.values().iterator();
            int count3 = 0;
            while(retCodeSubscriber.hasNext()) {
                count3 ++;
                SubscriberKit p = (SubscriberKit)retCodeSubscriber.next();
                Log.i("opentok-session", "Unsubcribing the active subscribers");
                Log.i("opentoksessionmanage",String.format("subscribe info %s",p.getStream().toString()));
                mSession.unsubscribe(p);
                p.destroy();
                mSession.disconnect();
            }
            if(count3 ==0){
                Log.i("opentok-session", "no subscriber to close..");
            }else{
                Log.i("opentoksessionmanage", String.format("subscriber used to have %d subscriber(s)",count3));
            }
            activeSubscribers.clear();

            int count4 = 0;
            Iterator retCodeSubscriber2 = activeSubscribers.values().iterator();
            while(retCodeSubscriber2.hasNext()) {
                count4 ++;
            }
            //this.activeSubscribers.remove(stream);
            Log.i("opentoksessionmanage", "here it is!");
            Log.i("opentoksessionmanage", String.format("now publishers in active subscribers..=%d",count4));
            Log.i("opentoksessionManage", "session disconnect..");
            mSession.disconnect();
        }
    }

    @ReactMethod
    public void sendMessage(String message) {
        mSession.sendSignal("message", message);
    }



    protected void sendEvent(Events event, WritableMap payload) {
        ReactContext reactContext = (ReactContext)getReactApplicationContext();
        reactContext
                .getJSModule(RCTNativeAppEventEmitter.class)
                .emit(event.toString(), payload);
    }

    /** OpenTokSessionListener **/

    @Override
    public void onConnected(Session session) {}

    @Override
    public void onDisconnected(Session session) {
        //do we have to control things here?

    }

    @Override
    public void onStreamReceived(Session session, Stream stream) {}

    @Override
    public void onStreamDropped(Session session, Stream stream) {}

    @Override
    public void onError(Session session, OpentokError opentokError) {}

    /* Signal Listener methods */

    @Override
    public void onSignalReceived(Session session, String type, String data, Connection connection) {
        WritableMap payload = Arguments.createMap();
        payload.putString("message", data);
        payload.putString("data", connection.getData());

        sendEvent(Events.EVENT_ON_MESSAGE_RECIEVED, payload);
    }
}
